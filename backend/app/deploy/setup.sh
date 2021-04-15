#!/usr/bin/env bash

set -e

# TODO: Set to URL of git repo.
PROJECT_GIT_URL='https://github.com/BAXTOR95/pokedex.git'

PROJECT_BASE_PATH='/usr/local/apps/pokedex'

echo "Installing dependencies..."
apt-get update
apt-get install -y python3-dev python3-venv sqlite python-pip supervisor nginx git

# Create project directory
mkdir -p $PROJECT_BASE_PATH
git clone $PROJECT_GIT_URL $PROJECT_BASE_PATH

# Create virtual environment
mkdir -p $PROJECT_BASE_PATH/backend/env
python3 -m venv $PROJECT_BASE_PATH/backend/env

# Install python packages
$PROJECT_BASE_PATH/backend/env/bin/pip install -r $PROJECT_BASE_PATH/backend/requirements.txt
$PROJECT_BASE_PATH/backend/env/bin/pip install uwsgi==2.0.18

# Run migrations and collectstatic
cd $PROJECT_BASE_PATH/backend/app
$PROJECT_BASE_PATH/backend/env/bin/python manage.py migrate
$PROJECT_BASE_PATH/backend/env/bin/python manage.py collectstatic --noinput

# Configure supervisor
cp $PROJECT_BASE_PATH/backend/app/deploy/supervisor_pokedex_api.conf /etc/supervisor/conf.d/pokedex_api.conf
supervisorctl reread
supervisorctl update
supervisorctl restart pokedex_api

# Configure nginx
cp $PROJECT_BASE_PATH/backend/app/deploy/nginx_pokedex_api.conf /etc/nginx/sites-available/pokedex_api.conf
rm /etc/nginx/sites-enabled/default
ln -s /etc/nginx/sites-available/pokedex_api.conf /etc/nginx/sites-enabled/pokedex_api.conf
systemctl restart nginx.service

echo "DONE! :)"
