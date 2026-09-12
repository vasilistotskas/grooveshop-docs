---
title: Infrastructure
description: What the infrastructure repository contains, how Argo CD applies it, and the commands operators use.
---

# Infrastructure

`grooveshop-infrastructure` holds the Kubernetes manifests for the whole
platform: a K3s cluster with Traefik ingress, managed by Argo CD in an
app-of-apps layout. A push to this repository is a deploy.

## Layout

| Path | Role |
|---|---|
| `manifests/app-root.yaml` | The root Application pointing at `app-directory/` |
| `manifests/app-directory/` | One Argo CD Application per component: the platform app, its staging twin, the two tenant ApplicationSets, and the operators (cert-manager, Longhorn, Postgres, Redis, RabbitMQ, Reloader, Sealed Secrets, VictoriaLogs) |
| `manifests/app-constructs/grooveshop/base/` | Deployments, Services, ConfigMaps, HPAs, PDBs, shared Traefik middlewares, the Redis and RabbitMQ and Postgres custom resources |
| `manifests/app-constructs/grooveshop/overlays/production/`, `overlays/staging/` | Ingresses, sealed secrets, patches, and one directory per tenant under `tenants/` (copy `TEMPLATE`) |
| `manifests/app-constructs/grooveshop/prepare-helm/` | The PreSync hook chart that runs `migrate_schemas`, `collectstatic` and the Meilisearch settings before pods roll |
| `docs/` | Runbooks: deploying, staging, tenant onboarding, missing secrets, sealed-secrets keys |
| `untracked/` | Gitignored: plaintext secrets, `seal.sh`, local scripts |

Image tags are pinned in `manifests/app-directory/app-grooveshop.yaml`
in **five** places (four kustomize images and the PreSync hook's Helm tag,
which must equal the Django tag). Chart and image versions are read from
the manifests, never copied into prose.

## Commands

```bash
kubectl config use-context <cluster-context>                # the production cluster context
kubectl apply -f manifests/app-root.yaml -n argocd          # first-time bootstrap
kubectl port-forward svc/argocd-server -n argocd 8080:443   # Argo CD UI (ClusterIP only)
argocd app sync app-grooveshop-staging                      # staging is manual-sync
./scripts/staging-refresh.sh                                # clone prod into staging
cd untracked/secrets && ./seal.sh [staging]                 # seal plaintext secrets into the overlay
kubectl get deploy -n grooveshop -o jsonpath='{range .items[*]}{.metadata.name}{"\t"}{.spec.template.spec.containers[0].image}{"\n"}{end}'   # what is RUNNING
```

There is no build step. Verify what is running rather than trusting the
Argo CD sync status; a child Application can report "Synced" against old
pins until the root app refreshes.

## Status of this section

The infrastructure section of these docs is not written yet. The
repository's `CLAUDE.md` and the runbooks under `docs/` are the guide
until then; the operator-facing procedures already have pages under
[Deploying](/dev/operations/deploying), [Staging](/dev/operations/staging),
[Secrets](/dev/operations/secrets) and [Backups](/dev/operations/backups),
and the environment map is under
[Environments & domains](/dev/platform/environments).
