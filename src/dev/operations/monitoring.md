---
title: Monitoring and alerting
description: What is scraped, where the dashboards and alert rules live, how Traefik traffic is attributed to an environment and a store, and the traps that silently blind a panel or an alert.
---

# Monitoring and alerting

Metrics, alerts and dashboards run in the `app-victoria-metrics`
Application (namespace `monitoring`): VictoriaMetrics stores the series,
vmalert evaluates the rules, Alertmanager routes them to Discord, and
Grafana shows them at `grafana.grooveshop.space` (behind Cloudflare
Access, see `docs/operator-dashboards.md` in the infrastructure repo).
Logs live in VictoriaLogs (`app-victoria-logs`); a second vmalert turns
log lines into alerts.

Everything is declared in git. Grafana's storage is an emptyDir, so a
dashboard, folder or datasource that is not in the repository does not
survive a pod restart, and neither do UI logins.

## Diagram

```mermaid
flowchart LR
  subgraph app[grooveshop / grooveshop-staging]
    F[Flower] & G[agent gateway] & M[media-stream] & R[RabbitMQ] & P[Patroni]
  end
  T[Traefik x2] --> A
  app -->|VMPodScrape| A[vmagent]
  C[cert-manager / Argo CD / Longhorn / VictoriaLogs] -->|VMServiceScrape| A
  K[kubelet / kube-state-metrics / API server] --> A
  A --> V[(VictoriaMetrics)]
  V --> VA[vmalert-vmks] --> AM[Alertmanager] --> D[Discord]
  L[(VictoriaLogs)] --> VL[vmalert-vlogs] --> AM
  V & L --> GF[Grafana]
```

## What is scraped

| Source | Scrape object | What it answers |
|---|---|---|
| Traefik | `victoria-metrics/scrapes/vmpodscrape-traefik.yaml` | Every request by Service, by router (one per Ingress host, so one per store) and by status. Django and the storefront export no metrics of their own |
| Flower | `grooveshop/base/metrics-scrapes.yaml` | Celery task events (`flower_events_total`, including `task-failed`), runtimes, workers online |
| Agent gateway | same file | Routes, status codes, Django upstream latency, rate limiting, tenant cache |
| Media stream | same file | Sharp pipelines, cache layers, admission control. Requires a bearer token, see below |
| RabbitMQ | same file | Node metrics from `/metrics`, per-queue depth and consumers from `/metrics/detailed` |
| Patroni | same file | Primary role, PostgreSQL running, timeline, WAL position |
| cert-manager, Argo CD controller, Longhorn, VictoriaLogs | `victoria-metrics/scrapes/vmservicescrape-*.yaml` | Certificate Ready and renewal, Application health and sync, volume robustness, log ingestion |
| Kubernetes | the chart | Nodes, kubelet and cAdvisor, kube-state-metrics, the API server |

`grooveshop/base/metrics-scrapes.yaml` carries no namespace, so each
overlay places a copy in its own namespace and production and staging are
scraped separately. vmagent picks the objects up in every namespace.

## Dashboards

Grafana folder **GrooveShop**, one JSON file per dashboard under
`victoria-metrics/dashboards/grooveshop/`, each with an **Environment**
selector:

| Dashboard | Answers |
|---|---|
| HTTP Traffic & Latency | Requests, 5xx, 4xx and latency by Service and by store host; load shedding; certificates; media stream; agent gateway |
| Background Work | Celery outcomes and failing tasks, queue depth and consumers, worker CPU and memory, ERROR log lines |
| Platform Health | Volumes (kubelet and Longhorn), PostgreSQL, container resources and restarts, Argo CD applications, the monitoring pipeline itself |

The chart's own dashboards go to the **Cluster** folder. Dashboards for
hardware and topologies this cluster does not have (Windows, AIX, macOS,
multi-cluster, Prometheus) are disabled, and every upstream source is
pinned to a tag or commit in `victoria-metrics/values.yaml`.

To change a dashboard, edit its JSON and push; the dashboards are
`editable: false` because a change saved in the UI would vanish on the next
restart. The generator in `victoria-metrics/dashboards/kustomization.yaml`
wraps each file into the ConfigMap the Grafana sidecar loads.

## Alerts

| Rule file | Covers |
|---|---|
| `victoria-metrics/rules/vmrule-grooveshop.yaml` | 5xx on the storefront and API, load shedding, certificates (cert-manager not Ready, served certificate near expiry), Celery task failures, no Celery workers, a queue with work and no consumer, no PostgreSQL primary, an unhealthy Longhorn volume, Argo CD applications unhealthy or auto-synced and stuck OutOfSync, log ingestion stopped |
| `victoria-metrics/logs-alerting/vmrule-grooveshop-logs.yaml` | Any ERROR, CRITICAL or FATAL log line in production, by container |
| chart (`vmks-rule-*`) | Kubernetes itself, including `TargetDown` for any scrape that fails |

The log rule exists because some failures produce no metric: the tasks
that send transactional mail catch their own exceptions and return
`False`, so a broken relay raises no 5xx and no `task-failed`.

## Attributing traffic to an environment and a store

Traefik labels a request with its own Service key,
`<namespace>-<service>-<port>@kubernetes`. That string cannot be split by
regex, because namespaces contain dashes:
`grooveshop-staging-backend-service-80` could be either namespace. The
`grooveshop.traefik` recording rules instead join against
`kube_service_info`, whose namespace and Service name are authoritative,
and publish:

| Series | Labels |
|---|---|
| `namespace_service_code:traefik_service_requests:rate5m` | `namespace`, `service`, `code` |
| `namespace_service_le:traefik_service_request_duration_seconds_bucket:rate5m` | `namespace`, `service`, `le` |
| `namespace_host_code:traefik_router_requests:rate5m` | `namespace`, `host`, `code` |
| `namespace_host_le:traefik_router_request_duration_seconds_bucket:rate5m` | `namespace`, `host`, `le` |

Every tenant shares the same Services, so the per-store view comes from
the router. Traefik names an Ingress router
`Normalize(namespace-ingress-host+path)`, and the host rules rebuild that
key from `kube_ingress_path`, which carries the real host. Routers on
`websecure` carry Traefik's `websecure-` prefix, which the rules strip.
Router metrics are enabled in `traefik/helmchartconfig.yaml`
(`addRoutersLabels`).

Dashboards and alerts read these series. Do not filter raw Traefik series
by a namespace regex.

## Invariants

- Log rules and log panels match the parsed `log.level` field, never the
  message text. Vector nests every JSON log line under `log.*`, so `_msg`
  holds only the message (`victoria-metrics/logs-alerting/vmrule-grooveshop-logs.yaml`).
- Every LogsQL alert carries its own `_time:` window; vmalert's `step` is
  ignored by VictoriaLogs.
- media-stream's `/metrics` accepts only `Authorization: Bearer` with the
  `media-stream-metrics-token` Secret, which is read-only by construction
  and not the admin secret that can flush caches (`MetricsTokenGuard` in
  the media-stream repository). The Deployment and the VMPodScrape read
  the same Secret.
- The VictoriaLogs datasource maps `log.level` to Grafana levels through
  `logLevelRules`, so log panels show levels instead of `UNK`.
- The VictoriaMetrics datasources declare the real 30-second scrape
  interval, so `$__rate_interval` never produces an empty rate window.
- vmalert-vmks loads 42 groups and 259 rules. A different count after a
  change means a selector or a rule file broke.

## Failure modes

- **A panel goes blank rather than red.** Its target is down, which reads
  as healthy. Platform Health shows "Scrape targets down", and
  `TargetDown` alerts on it.
- **Longhorn metrics refused.** Longhorn's own NetworkPolicy admits only
  its pods; `longhorn-system/setup/networkpolicy-allow-metrics.yaml` opens
  port 9500 to vmagent. Remove it and both manager targets go down.
- **media-stream target returns 401.** The pod and the VMPodScrape
  disagree on the token, or the Secret was rotated without the pods
  restarting. `TargetDown` fires.
- **Log alerts silent during an incident.** Check ingestion first
  (`GrooveShopLogIngestionStopped`, "Logs ingested / s"): with no rows
  arriving, every log rule sees zero errors.
- **The per-host panels lose a store.** A router name no longer matches
  its rebuilt key, for example because Traefik hashed two conflicting
  routers or a new entrypoint gained its own HTTP config. Check with an
  `unless` join of the router series against the rebuilt keys.

## Source

| File | Role |
|---|---|
| `grooveshop-infrastructure/manifests/app-directory/app-victoria-metrics.yaml` | The Application, its git paths and the `ignoreDifferences` for defaulted rule fields |
| `grooveshop-infrastructure/manifests/app-constructs/victoria-metrics/values.yaml` | Chart values: datasources, plugins, dashboard folders and pins, API server metric drops |
| `grooveshop-infrastructure/manifests/app-constructs/victoria-metrics/dashboards/` | Dashboard JSON and the ConfigMap generator |
| `grooveshop-infrastructure/manifests/app-constructs/victoria-metrics/rules/vmrule-grooveshop.yaml` | Recording rules and metric alerts |
| `grooveshop-infrastructure/manifests/app-constructs/victoria-metrics/logs-alerting/` | The log vmalert and its rule |
| `grooveshop-infrastructure/manifests/app-constructs/victoria-metrics/scrapes/` | Traefik and cluster-component scrapes |
| `grooveshop-infrastructure/manifests/app-constructs/grooveshop/base/metrics-scrapes.yaml` | Scrapes for the app's own components |
| `grooveshop-infrastructure/manifests/app-constructs/traefik/helmchartconfig.yaml` | Router metrics |
| `grooveshop-infrastructure/manifests/app-constructs/longhorn-system/setup/networkpolicy-allow-metrics.yaml` | Opens Longhorn metrics to vmagent |
| `grooveshop-media-stream/src/MediaStream/Metrics/guards/metrics-token.guard.ts` | The bearer check on `/metrics` |
