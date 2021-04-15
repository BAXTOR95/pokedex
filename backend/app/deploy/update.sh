#!/usr/bin/env bash

set -e

PROJECT_BASE_PATH='/usr/local/apps/pokedex'

git pull
cd $PROJECT_BASE_PATH/backend/app
$PROJECT_BASE_PATH/backend/env/bin/python manage.py migrate
$PROJECT_BASE_PATH/backend/env/bin/python manage.py collectstatic --noinput
supervisorctl restart pokedex_api

echo "DONE! :)"
