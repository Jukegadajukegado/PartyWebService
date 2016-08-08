var path = require('path');
var webpack = require('webpack');
var rev = require('git-rev-sync');

var fs = require('fs');
fs.writeFile("./public/js/version.js", "window.commit="+JSON.stringify({message: rev.message(), hash: rev.long()})+";"); 

module.exports = {
  devtool: 'eval',
  entry: [
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'public/js'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'src')
    }]
  }
};
