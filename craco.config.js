module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.resolve = {
        ...webpackConfig.resolve,
        alias: {
          '@': require('path').resolve(__dirname, 'src'),
        },
      };
      return webpackConfig;
    },
  },
};
