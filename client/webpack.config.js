var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

const ENV = process.env.NODE_ENV || 'development';

const extractSass = new ExtractTextPlugin({
      filename: "[name].[contenthash].css",
      disable: ENV === "development"
  });

const cssLoader = (ENV === 'production') ? 
                        ExtractTextPlugin.extract({
                              use: ['css-loader', 'sass-loader'],
                              fallback: 'style-loader'
                        }) : ['style-loader', 'css-loader', 'sass-loader'];

var config = {
      entry: './src/Index.jsx',
      output: {
            path: path.join(__dirname, 'dist'),
            filename: 'bundle.js',
      },
      devServer: {
            historyApiFallback: true,         
            port: 5000
      },
      devtool: 'source-map',
      resolve: {
            extensions: ['.js', '.jsx'],
            alias: {
                  Core: path.resolve(__dirname, 'src/core/')
            }
      },
      module: {
            loaders: [
                  {
                        test: /\.jsx?$/,
                        loader: 'babel-loader',
                        exclude: /node_modules/                        
                  },
                  {
                        test: /\.js?$/,
                        loader: 'babel-loader',
                        exclude: /node_modules/
                  },
                  {
                        test: /\.scss?$/,
                        use: cssLoader
                  },
                  {
                        test: /\.(jpe?g|gif|png|eot|svg|woff|woff2|ttf)$/,
                        use: {
                              loader: 'file-loader',
                              options: {
                                    name(file) {
                                          if(ENV === 'development') {
                                                return '[path][name].[ext]';
                                          }
                                          return '[hash].[ext]'
                                    }
                              }
                        }
                  }
            ]
      },

      plugins: [
            new HtmlWebpackPlugin({
                  template: './index.html',
                  filename: 'index.html',
                  inject: 'body'
            }),
            extractSass
      ]
};

module.exports = config;
