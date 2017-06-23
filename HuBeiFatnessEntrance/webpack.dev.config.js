/**
 * Created by aresn on 16/7/5.
 */
var config = require('./webpack.base.config');

config.devtool = '#source-map';
config.devServer = {
//服务器ajax反向代理
      historyApiFallback: true,
      hot: true,
      inline: true,
      contentBase: './dist',
      port: 8080,
      stats: { colors: true },
      proxy: {
        '/fatburn': {
          target: 'http://192.168.0.250:8080',
//          target: 'http://192.168.0.210:8080',
          secure: false,
          changeOrigin: true
        }
      }
}
module.exports = config;