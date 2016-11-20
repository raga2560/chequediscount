#!/bin/env node

var express = require('express')
  , app = express() // Web framework to handle routing requests
  , cons = require('consolidate') // Templating library adapter for Express
  , MongoClient = require('mongodb').MongoClient // Driver for connecting to MongoDB
  , routes = require('./routes'); // Routes for our application
  
// https://blog.openshift.com/run-your-nodejs-projects-on-openshift-in-two-simple-steps/  
// http://stackoverflow.com/questions/25467318/how-to-connect-mongodb-to-openshift
 
var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080 ;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
 
 app.use('/images',express.static(__dirname + '/images'));
 app.use('/visualization',express.static(__dirname + '/angularjsapp'));
 app.use('/',express.static(__dirname + '/chequediscount'));
 app.use('/chequediscount',express.static(__dirname + '/chequediscount'));
 
 // var mongo_url = process.env.OPENSHIFT_MONGODB_DB_URL ;
 //var mongo_url = "mongodb://$OPENSHIFT_MONGODB_DB_HOST:$OPENSHIFT_MONGODB_DB_PORT/" + "confapp"; 
 
 var mongo_url = process.env.OPENSHIFT_MONGODB_DB_URL + "angularseed";
 console.log("url = "+ mongo_url);

MongoClient.connect(mongo_url, function(err, db) {
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

	
 
app.listen(server_port, server_ip_address, function () {
  console.log( "Listening on " + server_ip_address + ", server_port " + server_port )
});

    
});
