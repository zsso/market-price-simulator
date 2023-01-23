module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/market-price-simulator/'
    : '/',
  configureWebpack: {
    resolve: {
      alias: {
        vue$: 'vue/dist/vue.esm-bundler.js'
      }
    }
  }
}