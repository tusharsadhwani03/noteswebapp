/* Importing required modules */
    var express = require('express');
    var ejs = require('ejs');
    var mongoose = require('mongoose');
    var bodyparser = require('body-parser');
    var router = require('./routes');

/* Init express , enable static content , setting the view engine */
    // 1. Init express in variable 'app'
        var app = express();

    // 2. Let's bring static content in action
        app.use(express.static('public'));

    // 3. Setting ejs as view-engine
        app.set('view engine','ejs');

/* Setting mongoose */
    // 1. Connect to the database
        mongoose.connect("mongodb+srv://tushar:tush03ar@mycluster.rys9d.mongodb.net/test",{useNewUrlParser : true , useUnifiedTopology : true});

/* Middlewares */
    // 1. Body parser
        app.use(bodyparser.json());
        app.use(express.urlencoded({extended : true}));
    
    // 2. For routing -> handling get and post requests
        app.use(router);

/* Setting the server */
    // 1. Set port
        const port = 3000;

    // 2. Listen to the port
        app.listen(3000,function(){
            console.log(`server started on port ${port}...`);
        });

