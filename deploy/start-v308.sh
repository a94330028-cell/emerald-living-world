#!/bin/sh
set -eu
revision="${1:?missing release revision}"
case "$revision" in
  ''|*[!0-9a-f]*) echo 'Invalid release revision' >&2; exit 1 ;;
esac
test "${#revision}" -eq 40
repo=https://raw.githubusercontent.com/a94330028-cell/emerald-living-world
apk add --no-cache unzip su-exec ca-certificates >/dev/null
mkdir -p /app
wget -q -O /tmp/emerald-source.zip "$repo/a1691a2336b28c643eb3aa54c7551a0eff31d330/emerald-source.zip"
wget -q -O /tmp/emerald-v308-overlay.zip "$repo/$revision/deploy/emerald-v308-overlay.zip"
sha256sum -c <<'HASHES'
c7e39749461b9810ead808ca43aa09708f1d5b6e1bc97cccb08c226cac48a2e5  /tmp/emerald-source.zip
fd1de8772e76c61f8c858759f9bfb69f01f76482a70e04419f660169b89c99a0  /tmp/emerald-v308-overlay.zip
HASHES
unzip -oq /tmp/emerald-source.zip -d /app
unzip -oq /tmp/emerald-v308-overlay.zip -d /app

export DATA_DIR="${DATA_DIR:-/data}"
test "$DATA_DIR" = /data
grep -q ' /data ' /proc/self/mountinfo
node - <<'CHECK_SAVE'
const fs = require('node:fs');
const valid = ['world.json', 'world.json.bak'].some(name => {
  try {
    const data = JSON.parse(fs.readFileSync('/data/' + name, 'utf8'));
    return Array.isArray(data.profiles) && Array.isArray(data.bots) && data.bots.length > 0;
  } catch {
    return false;
  }
});
if (!valid) {
  console.error('Nenhum save válido no volume de produção.');
  process.exitCode = 1;
}
CHECK_SAVE
backup=/data/backup-before-3.0.8
if [ ! -d "$backup" ]; then
  umask 077
  snapshot=$(mktemp -d /data/.pre-308.XXXXXX)
  for save in world.json world.json.bak; do
    if [ -f "/data/$save" ]; then cp -p "/data/$save" "$snapshot/"; fi
  done
  mv "$snapshot" "$backup"
  echo 'Backup de world.json preparado antes da versão 3.0.8.'
fi

cd /app
chmod 755 deploy/entrypoint.sh
exec ./deploy/entrypoint.sh
