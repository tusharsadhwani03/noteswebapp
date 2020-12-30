/* Import required modules */
    var mongoose = require('mongoose');
    var schema = mongoose.Schema;
    var {isEmail} = require('validator');

/* Create a Schema */
    var userSchema = new schema({
        username : {
            type : String,
            /*required : [true , "! Username is required"],
            unique : true*/
        },
        password : {
            type : String,
           // required : [true , "! Password is required"],
        },
        email : {
            type : String,
            /*required : [true , "! email is required"],
            unique : true,
            validate : isEmail*/
        },
        googleId : {
            type : String
        },
        notes : {
            type : Array,
        }
    });

/* Create a model */
    var User = mongoose.model('note',userSchema);

/* Export the model */
    module.exports = User;