const UserModel = require('../models/UserModel');

const loginPage = (req,res) =>{
    if(res.locals.users){
        return res.redirect('dashboard')
    }
    return res.render('login')
}

const registerPage = (req,res) => {
    return res.render('register')
}

const dashboardPage = (req,res) =>{
    return res.render('dashboard')
}

const loginuser = (req,res) =>{
    return res.redirect('dashboard')
}

const registeruser = async(req,res) =>{
     try {

        const {name,email,password} = req.body;
        await UserModel.create({
            name:name,
            email:email,
            password:password
        })
        
     } catch (error) {
        console.log(err);
        return false;
     }
}

module.exports = {loginPage , registerPage , dashboardPage , loginuser , registeruser}