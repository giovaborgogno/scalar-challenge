#!/bin/sh

echo 'Running migrations...'
python manage.py migrate

echo 'Loading initial data...'
python manage.py loaddata init_db.json

echo 'Collecting static files...'
python manage.py collectstatic --no-input

echo 'Running server...'
python manage.py runserver 0.0.0.0:8000