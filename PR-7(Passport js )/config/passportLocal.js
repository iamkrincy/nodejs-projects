const passport = require('passport');

const passportLocal = require('passport-local').Strategy;

const UserModel = require('../models/UserModel');

const user = require('../models/UserModel');


passport.use(new passportLocal({
    usernameField:'email'
},async (email,password,done) =>{
    try {

        let users = await UserModel.findOne({email:email});
        if(!users || users.password != password){
            console.log("Email and Password not match");
            return done(null,false);
        }
        return done(null,users);
        
    } catch (error) {
        console.log(error);
        return false;
    }
}
));

passport.serializeUser ((user,done) =>{
    return done(null,user._id)
})

passport.deserializeUser (async (id,done) =>{
    try {
        
        let user = await UserModel.findById(id);
        done(null,user);

    } catch (error) {
        console.log(error);
        return false;
    }
});

passport.chekuser = (req,res,next) =>{
        if(req.isAuthenticated()){
            return next();
        }
        return res.redirect('/')
}

passport.setuser = (req,res,next) =>{
    if(req.isAuthenticated()){
        res.locals.users = req.user
    }
    return next();
}

module.exports = passport; 