var express = require('express')
  , app = express() // Web framework to handle routing requests
  , cons = require('consolidate') // Templating library adapter for Express
  , MongoClient = require('mongodb').MongoClient // Driver for connecting to MongoDB
  , routes = require('./routes'); // Routes for our application
  
 
 
 
 app.use('/images',express.static(__dirname + '/images'));
 app.use('/dlview',express.static(__dirname + '/dlview'));
 app.use('/dataf',express.static(__dirname + '/dataf'));
 app.use('/visualization',express.static(__dirname + '/angularjsapp'));
 app.use('/Blogexpert',express.static(__dirname + '/Blogexpert'));
 app.use('/',express.static(__dirname + '/blogframework'));
 
 
 
MongoClient.connect('mongodb://localhost:27017/confapp', function(err, db) {
    "use strict";
    if(err) throw err;

    // Register our templating engine
    app.engine('html', cons.swig);
    app.set('view engine', 'html');
    app.set('views', __dirname + '/views');

    // Express middleware to populate 'req.cookies' so we can access cookies
    app.use(express.cookieParser());

    // Express middleware to populate 'req.body' so we can access POST variables
    app.use(express.bodyParser());

    // Application routes
    routes(app, db);

    app.listen(8080);
    console.log('Express server listening on port 8080');
});
