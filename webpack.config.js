var path = require('path');
var webpack = require('webpack');

var fs = require('fs');

var revision = {message: "Failed to retrieve revision", hash: "unknown"};

if(process.env.HEROKU_SLUG_COMMIT){
  console.log("Detected Heroku Commit Slug");
  revision = {message: HEROKU_SLUG_DESCRIPTION, hash: process.env.HEROKU_SLUG_COMMIT};
}else{
  var rev = require('git-rev-sync');
  revision = {message: rev.message(), hash: rev.long()};
}

fs.writeFile("./public/js/version.js", "window.commit="+JSON.stringify(revision)+";"); 

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
