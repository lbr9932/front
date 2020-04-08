const path    = require('path');
const webpack = require('webpack');
const banner  = require('./banner.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    main: './src/app.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve('./dist'),
  },
  module: {
    rules: [{
      test: /\.js$/, // .js 확장자로 끝나는 모든 파일
      use: [path.resolve('./myloader.js')] // 방금 만든 로더를 적용한다
    },{
      test: /\.css$/, // .css 확장자로 끝나는 모든 파일
      use: ['style-loader', 'css-loader'], // css-loader를 적용한다
    },{
      test: /\.png$/,
      use: {
        loader: 'url-loader', // url 로더를 설정한다
        options: {
          publicPath: './dist/', // file-loader와 동일
          name: '[name].[ext]?[hash]', // file-loader와 동일
          limit: 5000 // 5kb 미만 파일만 data url로 처리
        }
      }
    }],
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: '이것은 배너 입니다',
    }),
    new webpack.DefinePlugin({
      VERSION: JSON.stringify('v.1.2.3'),
      PRODUCTION: JSON.stringify(false),
      MAX_COUNT: JSON.stringify(999),
      'api.domain': JSON.stringify('http://dev.api.domain.com'),
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html', // 템플릿 경로를 지정
      templateParameters: { // 템플릿에 주입할 파라매터 변수 지정
        env: process.env.NODE_ENV === 'development' ? '(개발용)' : '',
      },
    })
  ]
}
