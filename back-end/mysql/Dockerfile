FROM mysql:8.0

# Copy SQL initialization script
COPY mysql/docker-php_export.sql /docker-entrypoint-initdb.d/

# The script will be automatically executed when container starts