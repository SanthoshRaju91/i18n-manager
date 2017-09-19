var path = require('path');
var config = {
   entry: './src/App.jsx', // entry point
   output: {
         path:path.join(__dirname, 'public'),
         filename: 'bundle.js', // place where bundled app will be served
      },
   devServer: {
         port: 5000, // development port server
         publicPath:"/public/"
      },
   module: {
         loaders: [
            {
               test: /\.jsx?$/, // search for js files
               exclude: /node_modules/,
               loader: 'babel-loader',
         }
      ]
   }
}
module.exports = config;
