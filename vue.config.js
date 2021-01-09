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
  },
  // pwa: {
  //   iconPaths: {
  //     favicon32: "./public/favicon.ico",
  //     favicon16: "./public/favicon.ico",
  //     appleTouchIcon: "./public/favicon.ico",
  //     maskIcon: "./public/favicon.ico",
  //     msTileImage: "./public/favicon.ico"
  //   }
  // }
}