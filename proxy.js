const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

app.use(
  '/api',
  createProxyMiddleware({
    target: 'https://www.swiggy.com',
    changeOrigin: true,
    pathRewrite: {
      '^/api': '/dapi',
    },
  })
);

app.listen(3001, () => {
  console.log('Proxy server running on http://localhost:3001');
});
