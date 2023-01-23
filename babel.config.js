module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  configureWebpack: {
    resolve: {
      alias: {
        vue$: 'vue/dist/vue.esm-bundler.js'
      }
    }
  }
}
