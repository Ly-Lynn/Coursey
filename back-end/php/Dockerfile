# Multi-stage build for PHP application
FROM composer:2.4 AS composer

# Copy composer files
COPY php/composer.json php/composer.lock* ./

# Install PHP dependencies
RUN composer install --no-dev --optimize-autoloader --no-scripts

# Production stage
FROM php:8.1-fpm-alpine

# Install PHP extensions
COPY --from=mlocati/php-extension-installer /usr/bin/install-php-extensions /usr/local/bin/
RUN install-php-extensions pdo pdo_mysql

# Copy PHP configuration
COPY php/conf.d/xdebug.ini /usr/local/etc/php/

# Copy vendor dependencies from composer stage
COPY --from=composer /app/vendor /var/www/html/vendor

# Copy application source code
COPY app /app

# Create .env directory and copy .env file
RUN mkdir -p /app/.env
RUN docker-php-ext-install mysqli
COPY .env/.env /app/.env/.env

WORKDIR /var/www/html

# Expose port
EXPOSE 9000
