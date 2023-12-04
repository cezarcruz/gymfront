#!/bin/sh

mkdir -p data
touch data/db.json

npx json-server --watch data/db.json
