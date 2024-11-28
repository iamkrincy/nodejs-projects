const UserModel = require('../model/UserModel');
const travelModel = require('../model/travelModel');
const fs = require('fs');

const registerPage = (req,res) =>{
    return res.render('register')
}

const loginPage = (req,res) =>{
    if(req.cookies['auth']){
        return res.redirect('/dashboard')
    }
    return res.render('login')
}

const dashboardPage = (req,res) =>{
    if(!req.cookies['auth']){
        return res.redirect('/')
    }
    return res.render('dashboard');
}

const registerrecord = async (req,res) =>{
    try{
       const {name,email,password} = req.body;

     await UserModel.create({
        name:name,
        email:email,
        password:password,
       })
       console.log("succesfully register");
       return res.redirect('/');
       
    }
    catch(err){
        console.log(err);
        return false;
    }
}

const loginrecord = async (req,res) =>{
    try{
       const  {email,password} = req.body;
       const user = await UserModel.findOne({email:email});
       if(!user || user.password != password){
        console.log("Email and Password not valid");
        return res.redirect('/');
       }

       res.cookie('auth',user)
       return res.redirect('/dashboard')
    }
    catch(err){
        console.log(err)
        return false;
    }
};

const logout = (req,res) => {
    return res.clearCookie('auth').redirect('/')
}

const travel = (req,res) =>{
    if(!req.cookies['auth']){
        return res.redirect('/')
    }
    return res.render('travel')
}

const eat = (req,res) =>{
    if(!req.cookies['auth']){
        return res.redirect('/')
    }
    return res.render('eat')
}

const relax = (req,res) =>{
    if(!req.cookies['auth']){
        return res.redirect('/')
    }
    return res.render('relax')
}

const add = (req,res) =>{
    if(!req.cookies['auth']){
        return res.redirect('/')
    }
    console.log("Add route accessed"); // Add this line
     
    return res.render('add')
}

const addRecord = async(req,res) =>{
    try {
        const {title,content} = req.body;

        await travelModel.create({
            title:title,
            content:content,
            image:req.file.path,
    })
    console.log("Post add Sucssefull");
    return res.redirect('/view');
        
    } catch (err) {
        console.log(err);
        return false
    }
}

const view= async (req, res)=>{
    try {
        let posts = await travelModel.find({});
        return res.render('view',{posts
        })
        
    } catch (error) {
        console.log(error);
        return false
        
    }
}

const deleteData = async(req,res) =>{
    try {
            let id = req.query.id
    
    let single=await travelModel.findById(id)
    fs.unlinkSync(single.image)
    
            await travelModel.findByIdAndDelete(id)
            return res.redirect('/view')
    } catch (error) {
        console.log(error);
        return false;
    }
}

const editData = async (req,res) =>{
    try {
        let id = req.query.id;
        let post = await travelModel.findById(id);
        return res.render('edit',{
            post
        })
        
    } catch (error) {
        console.log(error);
        return false;
    }
}

const updateRecord = async(req,res) => {
    try{
        const {editid,title,content} = req.body;
        if(req.file){
            let single = await travelModel.findById(editid);
            fs.unlinkSync(single.image);
            await travelModel.findByIdAndUpdate(editid,{
               title:title,
               content:content,
                image : req.file.path,
            })
            console.log("record update");
            return res.redirect('/view');
        }else{
            let single = await travelModel.findById(editid);

            await travelModel.findByIdAndUpdate(editid,{
                title:title,
                content:content,
                image:single.image,
            })
            console.log("record update");
            return res.redirect('/view');
        }
    }catch(err){
        console.log(err);
        return false;
    }
}








module.exports = {
    registerPage ,loginPage , dashboardPage , registerrecord , loginrecord , logout , travel , eat , relax , add , addRecord , view , deleteData , editData , updateRecord
}
