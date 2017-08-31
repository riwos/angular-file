export const string = "/*eslint-disable*/"+
"\nvar express = require('express');"+
"\nvar multer = require('multer');"+
"\nvar fs = require('fs');"+
"\nvar app = express();"+
"\n"+
"\nvar DIR = './uploads/';"+
"\n"+
"\nvar upload = multer({dest: DIR});"+
"\n"+
"\napp.use(function (req, res, next) {"+
"\n  res.setHeader('Access-Control-Allow-Origin', 'http://valor-software.github.io');"+
"\n  res.setHeader('Access-Control-Allow-Methods', 'POST');"+
"\n  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');"+
"\n  res.setHeader('Access-Control-Allow-Credentials', true);"+
"\n  next();"+
"\n});"+
"\n"+
"\napp.use(multer({"+
"\n  dest: DIR,"+
"\n  rename: function (fieldname, filename) {"+
"\n    return filename + Date.now();"+
"\n  },"+
"\n  onFileUploadStart: function (file) {"+
"\n    console.log(file.originalname + ' is starting ...');"+
"\n  },"+
"\n  onFileUploadComplete: function (file) {"+
"\n    console.log(file.fieldname + ' uploaded to  ' + file.path);"+
"\n  }"+
"\n}));"+
"\n"+
"\napp.get('/api', function (req, res) {"+
"\n  res.end('file catcher example');"+
"\n});"+
"\n"+
"\napp.post('/api', function (req, res) {"+
"\n  upload(req, res, function (err) {"+
"\n    if (err) {"+
"\n      return res.end(err.toString());"+
"\n    }"+
"\n"+
"\n    res.end('File is uploaded');"+
"\n  });"+
"\n});"+
"\n"+
"\nvar PORT = process.env.PORT || 3000;"+
"\n"+
"\napp.listen(PORT, function () {"+
"\n  console.log('Working on port ' + PORT);"+
"\n});"+
"\n"