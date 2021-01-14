/* Import required modules */
    var express = require('express');
    var routes = express.Router();
    var bodyparser = require('body-parser');
    var User = require('./model/notes_model');
    var jwt = require('jsonwebtoken');
    var {authuser , logauth ,delcookie,logfirst} = require('./middleware');

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

/* Function createtoken() */
    function createtoken(id){
    // sign is used to create a jwt which require a payload , a secret and expire time
        return jwt.sign({ id },process.env.cookiesecret,{expiresIn : 1*1*60*60});   
    }


/* Handling Get requests */
    // 1. Passing 'authuser' middleware created in middleware.js to all get request
        routes.get('*',authuser);

    // 2. Get request for home page
        routes.get('/',function(req,res){
            res.render('home');
        });

    // 3. Get request for login/signup page
        routes.get('/log',logauth,function(req,res){
            res.render('log');
        });

    // 4. Logged in users view i.e. notes page
        routes.get('/notes',logfirst,function(req,res){
            res.render('notes');
        });

    // 5. My NotesPage where all notes are displayed
        routes.get('/mynotes',logfirst,function(req,res){
            res.render('mynotes');
        });

    // 6. logout Get request
        routes.get('/logout',delcookie,function(req,res){
            res.redirect('/');
        });
        
    // 7. Privacy Get request
        routes.get('/privacy',function(req,res){
            res.render('privacy');
        });
        
/* Handling Post requests */
    // 1. Post request for signup
        routes.post('/signup' , async (req,res) => {
            const {username,email,password} = req.body;
            try{
                // (a) Creating new user in database
                    var user = await User.create({username : username,email : email,password : password});
                
                // (b) Creating jwt i.e jsonwebtoken
                    var token = createtoken(user._id);

                // (c) Passing jwt in cookie
                    res.cookie('jwt',token,{maxAge : 1*1*60*60*1000});
                
                // (d) Setting res.status
                    res.status(201).json({user : user._id});
                }
            catch(err){
                var errors = handleerrors(err);
                res.status(400).json({errors});
                console.log(errors);
            }
        });    

    // 2. Post request for login
        routes.post('/login',async (req,res) => {
            const {email,password} = req.body;
            try{
                // (a) Verifying user credentials using mongodb statics method
                    var user = await User.login(email,password);
                
                // (b) Creating jwt i.e jsonwebtoken
                    var token = createtoken(user._id);

                // (c) Passing jwt in cookie
                    res.cookie('jwt',token,{maxAge : 1*1*60*60*1000});
                
                // (d) Setting res.status
                    res.status(201).json({user : user._id});
                }
            catch(err)
            {
                // If errors send errors in handleerrors function
                    var errors = handleerrors(err);
                
                // Sending error response     
                    res.status(400).json({errors});
            }
        });

    // 3. Post request for Canvas-Image data
        routes.post('/savenote', async (req,res)=>{
            const {imagedata , username , Date , Title} = req.body;
            try{
                // (a) Finding Username
                    var user = await User.findOne({username});

                // (b) Store image data in database
                    await user.update({$push : {notes : {Title : Title,Date : Date,imagedata : imagedata}}});
                    
                // (c) Setting response
                    res.status(201).json({user : user._id});
                }
            catch(err)
            {
                // If errors console.log them
                    console.log(err);

                // Sending error response     
                    res.status(400).json({err});
            }

        });

    // 4. Post request for Deleting note from database
        routes.post('/delete',async(req,res) => {
            const{username,noteid} = req.body;
            try {
                // (a) Finding username 
                    var user = await User.findOne({username});
                    
                // (b) Deleting that Note
                    await user.update({$pull : {notes :{imagedata : noteid} }});

                // (c) Sending response
                    res.status(201).json({user:user._id});
            } 
            catch (error) {
                // If errors console.log them
                    console.log(error);

                // Sending error response     
                    res.status(400).json({error});
            }
        });
/* Exporting the Router instance */
    module.exports = routes;