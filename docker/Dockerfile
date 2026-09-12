ARG NODE_VERSION=24.19.0

FROM node:${NODE_VERSION}-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

WORKDIR /usr/src/app

# Manifests first so the dependency layer survives content edits.
COPY package.json pnpm-lock.yaml ./

FROM base AS build

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile --prefer-offline

# The synced per-service reference tree (src/dev/*/reference, gitignored)
# must already exist in the build context: CI runs `pnpm sync:sources`
# before building the image, because the sibling repositories are not
# available inside the build.
COPY . .

ARG DOCS_SITE_URL
ENV DOCS_SITE_URL=${DOCS_SITE_URL}

RUN pnpm run build

# Same base image as the platform's static asset server
# (grooveshop-infrastructure base/static.yaml).
FROM nginxinc/nginx-unprivileged:1.30.0-alpine3.23 AS production

COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1/healthz >/dev/null 2>&1 || exit 1
