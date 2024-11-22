const UserModel = require('../models/UserModel');

const loginpage = (req,res) =>{
    if(req.cookies['auth']){
        return res.redirect('/blog')
    }
    return res.render('login');
}

const registerpage = (req,res) =>{
    return res.render('register')
}

const blogpage = (req,res,posts) =>{
    if(!req.cookies['auth']){
        return res.redirect('/')
    }
    return res.render('blog',{ posts })
}

const registeruser = async (req,res) =>{
      try {
        const {name,email,password} = req.body;

        await UserModel.create({
            name:name,
            email:email,
            password:password,
        })
        console.log("succesfully register");
        return res.redirect('/')
        
      } catch (err) {
        console.log(err);
        return false;
      }
}

const loginuser = async (req,res) =>{
    try {
        const {email,password} = req.body;

        const user = await UserModel.findOne({email:email});
        if(!user || user.password != password){
            console.log("Email and Password not match");
            return res.redirect('/');
            
        }
        res.cookie('auth',user)
        return res.redirect('/blog')
        
    } catch (err) {
        console.log(err);
        return false;
    }
}

const travel = (req,res) =>{
    return res.render('travel')
}

const eat = (req,res) =>{
    return res.render('eat')
}

const relax = (req,res) =>{
    return res.render('relax')
}

const add = (req,res) =>{
    console.log("Add route accessed"); // Add this line

    return res.render('add')
}






module.exports = {loginpage,registerpage,registeruser,loginuser,blogpage,travel,eat,relax,add};