FROM nginx:alpine

# Copy nginx configuration
COPY nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf

# Copy PHP application files
COPY app/public /app/public

# Copy admin panel static files
COPY app/public/adminpanel /app/adminpanel

# Expose ports
EXPOSE 80 8082