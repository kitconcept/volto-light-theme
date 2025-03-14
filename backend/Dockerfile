# syntax=docker/dockerfile:1
ARG PLONE_VERSION
ARG SEED=1000
FROM plone/server-builder:${PLONE_VERSION:-6.1.0b1} as builder

# https://github.com/pypa/pip/issues/12079
ENV _PIP_USE_IMPORTLIB_METADATA=0

WORKDIR /app

# Add local code
COPY . src/kitconcept.voltolighttheme

# Install local requirements and pre-compile mo files
RUN <<EOT
    set -e
    mv src/kitconcept.voltolighttheme/requirements-docker.txt ./requirements.txt
    mv src/kitconcept.voltolighttheme/scripts/* ./scripts/.
    # mv src/kitconcept.voltolighttheme/docker-entrypoint.sh ./docker-entrypoint.sh
    bin/pip install -r requirements.txt
    bin/python /compile_mo.py
    rm -Rf src/ /compile_mo.py compile_mo.log
EOT

FROM plone/server-prod-config:${PLONE_VERSION:-6}

LABEL maintainer="kitconcept GmbH <contact@kitconcept.com>" \
      org.label-schema.name="ghcr.io/kitconcept/voltolighttheme" \
      org.label-schema.description="Example content for @kitconcept/volto-light-theme" \
      org.label-schema.vendor="kitconcept GmbH"

# Disable MO Compilation
ENV zope_i18n_compile_mo_files=
# Show only our distributions
ENV ALLOWED_DISTRIBUTIONS=voltolighttheme
# Increase Upload limit to 6MB
ENV ZOPE_FORM_MEMORY_LIMIT=6MB

COPY --from=builder /app /app

RUN <<EOT
    set -e
    ln -s /data /app/var
    chown -R 500:500 /app/etc/
    SEED=${SEED} ./docker-entrypoint.sh create-site
EOT
