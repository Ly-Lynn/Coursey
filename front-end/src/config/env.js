// src/config/env.js
const ENV = {
    development: {
      hostName: 'http://localhost:3000/',
      // các config khác cho môi trường development
    },
    staging: {
      hostName: 'https://staging-api.yourapp.com/',
      // các config khác cho môi trường staging
    },
    production: {
      hostName: 'https://api.yourapp.com/',
      // các config khác cho môi trường production
    }
  };
  
  // Lấy môi trường từ process.env.NODE_ENV hoặc mặc định là development
  const environment = process.env.NODE_ENV || 'development';
  
  // Export config dựa theo môi trường
  export const config = ENV[environment];
  
  // Export các biến riêng lẻ để dễ sử dụng
  export const { hostName } = config;
  
  // Có thể export thêm các hằng số khác
  export const API_ENDPOINTS = {
    LOGIN: 'api/auth/login',
    VALIDATE: 'api/auth/validate',
    // ... các endpoint khác
  };