# syntax=docker/dockerfile:1
ARG VOLTO_VERSION
FROM plone/frontend-builder:${VOLTO_VERSION} as builder

ARG ADDON_NAME
ARG ADDON_PATH

COPY --chown=node:node ./ /app/src/addons/${ADDON_PATH}/

RUN <<EOT
    /setupAddon
    yarn install --network-timeout 1000000
    yarn build
    rm -rf cache omelette .yarn/cache
EOT

FROM plone/frontend-prod-config:${VOLTO_VERSION}

LABEL maintainer="Plone Community <dev@plone.org>" \
      org.label-schema.name="volto-social-blocks" \
      org.label-schema.description="Plone frontend image" \
      org.label-schema.vendor="Plone Foundation"

COPY --from=builder /app/ /app/
