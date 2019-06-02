import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackBar from 'webpackbar';

const { NODE_ENV } = process.env;

export default {
  mode: NODE_ENV,
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  performance: {
    hints: NODE_ENV === 'production' ? 'warning' : false
  },
  devServer: {
    host: '0.0.0.0',
    port: 3006,
    compress: true,
    stats: 'errors-only'
  },
  plugins: [
    new WebpackBar(),
    new HtmlWebpackPlugin({
      template: './src/index.ejs',
      filename: 'index.html'
    })
  ]
};
