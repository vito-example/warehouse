# Warehouse Challange

Install the dependencies.

```sh
cd warehouse-challange
composer install
npm install
```

### For run migrations...

create .env file by .env.example

or

MIX_SERVER_API_URL=http://127.0.0.1:8000/api/v1 - api url

MIX_PAGE_SIZE=1 - pagination

insert .env file


```sh
php artisan migrate
npm run watch
```
