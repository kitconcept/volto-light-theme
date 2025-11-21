# syntax=docker/dockerfile:1
ARG VOLTO_VERSION=undefined
FROM plone/frontend-builder:${VOLTO_VERSION} AS builder

COPY --chown=node packages/volto-light-theme /app/packages/volto-light-theme
COPY --chown=node volto.config.js /app/
COPY --chown=node pnpm-workspace.yaml /app/
COPY --chown=node package.json /app/package.json
COPY --chown=node mrs.developer.json /app/mrs.developer.json

RUN --mount=type=cache,id=pnpm,target=/app/.pnpm-store,uid=1000 <<EOT
     set -e
     make install
     pnpm build
     # This is necessary because the build is trying to recreate the node_modules folder
     # by telling it to CI=1 it will just recreate them
     CI=1 pnpm install --prod
EOT

FROM plone/frontend-prod-config:${VOLTO_VERSION}

LABEL maintainer="Plone Foundation <collective@plone.org>" \
      org.label-schema.name="adfsdf-frontend" \
      org.label-schema.description="adfsdf frontend image." \
      org.label-schema.vendor="Plone Foundation"

COPY --from=builder /app/ /app/
