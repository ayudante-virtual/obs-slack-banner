#!/bin/bash
set -e

FILE_PATH="${1:-text.txt}"
echo "Text will be written to ${FILE_PATH}"
OLD_CONTENT=$(cat "$FILE_PATH")

function fetch() {
  echo -ne "Fetching latest text..."
  NEW_CONTENT=$(curl -s https://obs-slack-banner.ayudantes.ninja/api/messages/latest | jq -r '.text')
  echo -ne "OK"\\r

  if [[ "$OLD_CONTENT" != "$NEW_CONTENT" ]]; then
    echo "$NEW_CONTENT" > "$FILE_PATH"
    OLD_CONTENT=NEW_CONTENT
  fi
}

while true; do
  fetch
  sleep 1
done
