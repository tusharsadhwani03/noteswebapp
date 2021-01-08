/* Import required modules */
    var keys = require('./keys');
    const jwt  = require('jsonwebtoken');
    const User = require('./model/notes_model');
    
/*  */
    var authuser = (req,res,next) => {
        var token = req.cookies.jwt;

        if (token)
        {
            jwt.verify(token,keys.cookiesecret.secret, async (err, decodedToken) => {
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

    var logauth = (req,res,next) => {
        var token = req.cookies.jwt;
        if (token)
        {
            jwt.verify(token,keys.cookiesecret.secret, async (err, decodedToken) => {
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

    var delcookie = (req,res,next) => {
        res.cookie('jwt','',0);
        next();
    };

    var logfirst = (req,res,next) => {
        var token = req.cookies.jwt;
        if(token)
        {
            jwt.verify(token,keys.cookiesecret.secret,async (err,decodedToken) => {
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

module.exports = {authuser , logauth , delcookie,logfirst} ;