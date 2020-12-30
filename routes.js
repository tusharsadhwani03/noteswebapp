/* Import required modules */
    const express = require('express');
    const routes = express.Router();
    const bodyparser = require('body-parser');
    const User = require('./model/usermodel');

/* Middlewares */
    routes.use(bodyparser.json());
    routes.use(express.urlencoded({extended : true}));

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
    // 1. Post request for addnotes 
        routes.post('/addnotes',(req,res) => {
            const user = new User({
            username : req.body.username,
            email : req.body.email,
            password : req.body.password,
            notes : req.body.notetext
        });
    user.save();
    res.send(user);
});

/* Exporting the Router instance */
    module.exports = routes;