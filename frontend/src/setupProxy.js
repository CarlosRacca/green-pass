const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  // Proxy Admin (Next.js) under /admin-next
  app.use(
    ['/admin-next', '/admin-next/**'],
    createProxyMiddleware({
      target: 'http://localhost:3001',
      changeOrigin: true,
      ws: true,
      logLevel: 'silent',
      // Next no usa basePath, remover /admin-next para que resuelva rutas
      pathRewrite: { '^/admin-next': '/' },
    })
  );

  // Proxy Next.js assets (_next/*) so dev static/runtime files load correctly
  app.use(
    ['/_next', '/_next/**'],
    createProxyMiddleware({
      target: 'http://localhost:3001',
      changeOrigin: true,
      ws: true,
      logLevel: 'silent',
    })
  );
};


