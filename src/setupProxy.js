const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/wp-json",
    createProxyMiddleware({
      target: "https://mapekouluruoka.fi",
      changeOrigin: true,
      logLevel: "debug",
      followRedirects: true,
      protocalRewrite: false,
    })
  );
};
