var path = require('path');
var webpack = require('webpack');

var fs = require('fs');

var revision = {message: "Failed to retrieve revision", hash: "unknown"};

if(process.env.SOURCE_VERSION){
  console.log("Detected Heroku Commit Slug");
  revision = {hash: process.env.SOURCE_VERSION};
}else{
  var rev = require('git-rev-sync');
  revision = {hash: rev.long()};
}

fs.writeFile(path.join(__dirname,"public/js/version.js"), "window.commit="+JSON.stringify(revision)+";"); 

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
