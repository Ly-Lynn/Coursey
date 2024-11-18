FROM php:8.1-fpm-alpine

COPY --from=mlocati/php-extension-installer /usr/bin/install-php-extensions /usr/local/bin/

RUN set -eux; \
    install-php-extensions pdo pdo_mysql;

ENV COMPOSER_ALLOW_SUPERUSER=1

COPY --from=composer:2.4 /usr/bin/composer /usr/bin/composer

COPY ./composer.json ./

RUN composer require symfony/dotenv \
    && composer install \
    && composer dump-autoload \
    && ls -la /var/www/html/vendor  # Thêm lệnh này để kiểm tra vendor folder

COPY . .

# RUN ls  /var/www/html/vendor
# RUN ls