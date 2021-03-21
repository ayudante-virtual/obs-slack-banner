#!/bin/bash
set -e

FILE_PATH="${1:-text.txt}"
echo "Text will be written to ${FILE_PATH}"

function fetch() {
  echo -ne "Fetching latest text..."
  curl -s https://obs-slack-banner.ayudantes.ninja/api/messages/latest | jq -r '.text' > "$FILE_PATH"
  echo -ne "OK"\\r
}

while true; do
  fetch
  sleep 1
done
