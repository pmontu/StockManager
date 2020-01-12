# Install python dependencies

```
pyenv virtualenv StockManager
pipenv install
```

# Run Development Environment

```
pyenv activate StockManager
./manage.py runserver --settings=StockManager.settings.dev
rabbitmq-server
DJANGO_SETTINGS_MODULE=StockManager.settings.dev celery -A StockManager worker -l info
yarn start
```

# Check Build

```
yarn build
./manage.py collectstatic --settings=StockManager.settings.dev
DJANGO_SETTINGS_MODULE=StockManager.settings.dev daphne StockManager.asgi:application --port \$PORT --bind 0.0.0.0 -v2
```
