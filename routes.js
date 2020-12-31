/* Import required modules */
    var express = require('express');
    var routes = express.Router();
    var bodyparser = require('body-parser');
    var User = require('./model/notes_model');

/* Middlewares */
    routes.use(bodyparser.json());
    routes.use(express.urlencoded({extended : true}));

/* Handleerrors function() */
    function handleerrors(err){
        console.log(err);
        var errors = {username : '' , email : '' , password : ''};

        // 1. Login errors
            if(err.message === "incorrect email")
            {
                errors.email = "! This Email is not registered";
            }
            if(err.message === "incorrect password")
            {
                errors.password = "! Incorrect password . Try again !";
            }

        // 2. Signup errors for checking uniqueness
        if(err.code === 11000)
        {
            if(err.message.includes('email')){
                errors.email = "! This Email is already registered";
            }
            if(err.message.includes('username')){
                errors.username = "! This Username is already registered";
            }
            return errors;
        }

        // 3. Other Signup errors
        if(err.message.includes('node validation failed')){
            Object.values(err.errors).forEach(({properties}) => {
                errors[properties.path] = properties.message;
            });
        }
        return errors;
    }


/* Handling Get requests */
    // 1. Get request for home page
        routes.get('/',function(req,res){
            res.render('add_notes');
        });

    // 2. Get request for test
        routes.get('/test',async function(req,res){
            const user = await User.findOne({email : "tusharsadhwani03@gmail.com"});
            user.notes.push("hi");
        //    res.render('log',{notes : user.notes});
        });

    // 3. Get request for login/signup page
        routes.get('/log',function(req,res){
            res.render('log');
        });

/* Handling Post requests */
    // 1. Post request for signup
        routes.post('/signup' , async (req,res) => {
            const {username,email,password} = req.body;
            try{
                var user = await User.create({username : username,email : email,password : password});
                res.status(201).json({user : user._id});  
            }
            catch(err){
                var errors = handleerrors(err);
                res.status(400).json({errors});
                console.log(errors);
            }
        });    

    // 2. Post request for login
        routes.post('/login' , async (req,res) => {
            const {email,password} = req.body;
            try{
                var user = await User.login(email,password);
                res.status(201).json({user : user._id});
            }
            catch(err)
            {
                var errors = handleerrors(err);
                res.status(400).json({errors});
            }
        });

/* Exporting the Router instance */
    module.exports = routes;