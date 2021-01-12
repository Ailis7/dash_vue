const path = require('path');

module.exports = ({ config, mode }) => {
  config.module.rules.push({
    test: /\.styl$/,
    use: ['style-loader', 'css-loader', 'stylus-loader'],
    include: [
      path.resolve(__dirname, '../src'),
      path.resolve(__dirname, './assets')
    ]
  });

  return config;
};
