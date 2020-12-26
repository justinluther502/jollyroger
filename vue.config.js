module.exports = {
  devServer: {
    proxy: {
      '^/api2': {
        target: 'https://gdcdyn.interactivebrokers.com',
        pathRewrite: {'^/api2' : ''},
        changeOrigin: false,
        ws: true,
      },
    }
  }
}