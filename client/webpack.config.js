var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');


const extractSass = new ExtractTextPlugin({
      filename: "[name].[contenthash].css",
      disable: process.env.NODE_ENV === "development"
  });

var config = {
      entry: './src/App.jsx',
      output: {
            path: path.join(__dirname, 'dist'),
            filename: 'bundle.js',
      },
      devServer: {
            port: 5000, 
            publicPath: "/dist/"
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
                        use: ExtractTextPlugin.extract({
                              use: ['css-loader', 'sass-loader'],
                              fallback: 'style-loader'
                        })
                  },
                  {
                        test: /\.(jpe?g|gif|png|eot|svg|woff|woff2|ttf)$/,
                        use: 'file-loader'
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
