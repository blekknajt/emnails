#!/bin/bash
# Buduje stronę Hugo i wysyła katalog public/ na serwer.
# Przed pierwszym wysłaniem uzupełnij dane serwera (SSH_PORT, REMOTE_TARGET).
set -euo pipefail
cd "$(dirname "$0")"

if command -v hugo >/dev/null 2>&1; then
  hugo --minify --gc --cleanDestinationDir
else
  echo "UWAGA: nie znaleziono polecenia hugo – zainstaluj Hugo Extended przed wysłaniem." >&2
  exit 1
fi

# Odkomentuj i uzupełnij dane docelowego hostingu, np.:
# rsync -av --delete -e "ssh -p22" ./public/ uzytkownik@serwer.pl:domains/emnails-lubsko.pl/public_html
echo "Zbudowano katalog public/. Uzupełnij komendę rsync w wyslij.sh, aby wgrać stronę na serwer."
