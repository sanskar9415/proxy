const express = require('express');
const path = require('path');
const cors = require('cors'); // Import the cors package
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Apply CORS middleware
app.use(cors({
  origin: '*', // Allow requests from any origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type, Authorization',
}));

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, 'dist')));

// Proxy API requests
app.use(
  '/api',
  createProxyMiddleware({
    target: 'https://www.swiggy.com',
    changeOrigin: true,
    pathRewrite: {
      '^/api': '/dapi', // This ensures the request is correctly routed
    },
    onProxyRes: (proxyRes, req, res) => {
      // Log the proxy response status
      console.log(`PROXY RESPONSE: ${proxyRes.statusCode}`);
    },
    onError: (err, req, res) => {
      console.error('Proxy Error:', err);
      res.status(500).json({ error: 'Proxy error' });
    }
  })
);

app.listen(1234, () => {
  console.log('Proxy server is running on http://localhost:1234');
});
