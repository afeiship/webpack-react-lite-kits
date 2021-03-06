import webpack from 'webpack';
import { resolve } from 'path';
import SpritesmithPlugin from 'webpack-spritesmith';

const { CleanWebpackPlugin, Webpackbar } = require('next-load-plugins').load();

export default {
  mode: process.env.NODE_ENV || 'production',
  entry: {
    react: ['react', 'react-dom'],
    next: [
      'next-js-core2',
      'next-react-redux',
      'next-chunk',
      'next-time-chunk',
      'next-guid',
      'next-json'
    ]
  },
  output: {
    path: resolve(__dirname, 'dist/'),
    filename: 'vendors/dll-[name].[chunkhash].js',
    library: '[name]_library'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new Webpackbar(),
    new webpack.DllPlugin({
      path: resolve(__dirname, 'dist/vendors/manifest.json'),
      name: '[name]_library'
    }),
    new SpritesmithPlugin({
      src: {
        cwd: resolve(__dirname, 'src/assets/icons'),
        glob: '*.png'
      },
      target: {
        image: resolve(__dirname, 'src/assets/sprite/icons.png'),
        css: resolve(__dirname, 'src/assets/sprite/icons.scss')
      },
      apiOptions: {
        cssImageRef: '~assets/sprite/icons.png'
      },
      spritesmithOptions: {
        algorithm: 'top-down'
      }
    })
  ]
};
