module.exports = {
  configureWebpack: config => {
    config.devServer = {
      contentBase: '/home/my/dev/tests/t-vf-front-3/server',
      disableHostCheck: true,
      host: '0.0.0.0',
      port: 8004,
      proxy: {
        '/eng2/*': {
          target: 'http://0.0.0.0:8004/',
          pathRewrite: { '^/eng2': '' },
        },
      },
    };
  },
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].template = '/home/my/dev/tests/t-vf-front-3/server/index.html';
        return args
      })
  }
};
