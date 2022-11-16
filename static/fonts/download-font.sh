#!/bin/bash
# Usage: yarn download-font Source Code Pro

set -e

FONT_NAME="$*"
FONT_DIRECTORY="$( dirname -- "$0"; )"

if [ -z "$FONT_NAME" ]; then
  echo "[ERROR] Please specify a font name from https://fontsource.org/fonts"
  exit 1
fi

echo "Importing $FONT_NAME"

FONT_KEY=$(echo $FONT_NAME | tr '[:upper:]' '[:lower:]' | tr ' ' '-')

echo "Downloading $FONT_KEY from fontsource"

wget -qN --directory-prefix $FONT_DIRECTORY https://unpkg.com/@fontsource/$FONT_KEY/files/$FONT_KEY-all-200-normal.woff
wget -qN --directory-prefix $FONT_DIRECTORY https://unpkg.com/@fontsource/$FONT_KEY/files/$FONT_KEY-all-400-normal.woff
wget -qN --directory-prefix $FONT_DIRECTORY https://unpkg.com/@fontsource/$FONT_KEY/files/$FONT_KEY-all-500-normal.woff