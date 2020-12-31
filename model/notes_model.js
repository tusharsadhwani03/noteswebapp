/* Import required modules */
var mongoose = require('mongoose');
var schema = mongoose.Schema;
var {isEmail} = require('validator');
var bcrypt = require('bcrypt');

mongoose.set('useCreateIndex',true);

/* Create a Schema */
    var userSchema = new schema({
    username : {
        type : String,
        required : [true , "! Username is required"],
        unique : true
    },
    password : {
        type : String,
        minlength : [8,"! Password must contains atleast 8 charachters"],
        required : [true , "! Password is required"],
    },
    email : {
        type : String,
        required : [true , "! Email is required"],
        unique : true,
        validate : [isEmail , "! Enter valid email"]
    },
    googleId : {
        type : String
    },
    notes : {
        type : Array,
    }
});

/* Adding Hooks */
userSchema.pre('save',async function(next){
    var salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password,salt);
    next();
});

/* Adding static method for user login */
    userSchema.statics.login = async function(email,password)
    {
        var user = await User.findOne({email : email});
        if (user)
        {
            var auth = await bcrypt.compare(password,user.password);
            if(auth)
            {
                return user;
            }
            else{
                throw Error("incorrect password");
            }
        }
        throw Error("incorrect email");
    };

/* Create a model */
var User = mongoose.model('node',userSchema);

/* Export the model */
module.exports = User;