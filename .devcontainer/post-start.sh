#!/bin/bash

if [ ! -f /home/node/.first_run ]; then
  git config --global --add safe.directory $(pwd)
  git config --global core.autocrlf input
  git config --global core.editor nano

  pnpm config set store-dir $PNPM_STORE_DIR
  pnpm install
  pnpm playwright:install

  if [ ! -f .env ]; then
    cp .env.example .env
    echo -e "\e[31mPlease fill in the .env file\e[0m"
  fi

  touch /home/node/.first_run
fi
