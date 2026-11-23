#!/bin/bash
# Buduje stronę Hugo i publikuje gotowy katalog public/ na gałęzi gh-pages (GitHub Pages).
set -euo pipefail
cd "$(dirname "$0")"

HUGO_BIN="$(command -v hugo || echo /snap/bin/hugo)"
if [ ! -x "$HUGO_BIN" ]; then
  echo "BŁĄD: nie znaleziono polecenia hugo." >&2
  exit 1
fi

"$HUGO_BIN" --minify --gc --cleanDestinationDir

TMP_DIR="$(mktemp -d)"
trap 'rm -rf "$TMP_DIR"' EXIT
cp -a public/. "$TMP_DIR/"

REMOTE_URL="$(git remote get-url origin)"
git -C "$TMP_DIR" init -b gh-pages
git -C "$TMP_DIR" add -A
git -C "$TMP_DIR" commit -m "Deploy GitHub Pages ($(date +%Y-%m-%d\ %H:%M))"
git -C "$TMP_DIR" push --force "$REMOTE_URL" gh-pages

echo "Opublikowano na GitHub Pages!"
