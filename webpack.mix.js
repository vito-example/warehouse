const mix = require('laravel-mix');
require('dotenv').config()


mix.js('portal/index.js', 'public/js').react();
