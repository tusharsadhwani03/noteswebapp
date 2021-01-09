/* Import required modules */
    const jwt  = require('jsonwebtoken');
    const User = require('./model/notes_model');
    
/* Middleware for sending user details at each page if cokkie exist  */
    var authuser = (req,res,next) => {
        var token = req.cookies.jwt;
        if (token)
        {
            jwt.verify(token,process.env.cookiesecret, async (err, decodedToken) => {
                if (err)
                {
                    res.locals.user = null;
                    next();
                }
                else{
                    var user = await User.findById(decodedToken.id);
                    console.log(user);
                    res.locals.user = user;
                    next();
                }
            });
        }
        else{
            res.locals.user = null;
            next();
        }
    };

/* Middleware for redirecting to notes page if user already logged in and trying to access login page */
    var logauth = (req,res,next) => {
        var token = req.cookies.jwt;
        if (token)
        {
            jwt.verify(token,process.env.cookiesecret, async (err, decodedToken) => {
                if (err)
                {
                    next();
                }
                else{
                    res.redirect('/notes');
                }
            });
        }
        else{
            next();
        }
    };

/* Middleware for replacing cookie when logout */
    var delcookie = (req,res,next) => {
        res.cookie('jwt','',0);
        next();
    };

/* Middleware for redirecting to log page if user not loged in and trying to access notes or mynotes page  */
    var logfirst = (req,res,next) => {
        var token = req.cookies.jwt;
        if(token)
        {
            jwt.verify(token,process.env.cookiesecret,async (err,decodedToken) => {
                if(err)
                {
                    res.redirect('/log');
                }
                else
                {
                    next();
                }
            });
        }
        else
        {
            res.redirect('/log');
        }
    }; 

/* Exporting the middlewares */
    module.exports = {authuser , logauth , delcookie,logfirst} ;