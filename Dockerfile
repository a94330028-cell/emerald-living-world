# Emerald Living World — Railway
# The repository contains a source archive named emerald-source.zip.
FROM alpine:3.21 AS extract
RUN apk add --no-cache unzip
WORKDIR /source
COPY emerald-source.zip /tmp/emerald-source.zip
RUN unzip -q /tmp/emerald-source.zip -d /source \
 && test -f /source/package.json \
 && test -f /source/server/app.cjs \
 && test -f /source/deploy/entrypoint.sh

FROM node:22-alpine
RUN apk add --no-cache su-exec
WORKDIR /app
COPY --from=extract --chown=node:node /source/ /app/
RUN chmod 755 /app/deploy/entrypoint.sh
ENV NODE_ENV=production HOST=0.0.0.0 DATA_DIR=/data AUTH_MODE=required
EXPOSE 8080
ENTRYPOINT ["/app/deploy/entrypoint.sh"]
