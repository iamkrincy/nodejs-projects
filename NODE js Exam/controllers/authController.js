const UserModel = require('../models/UserModel');
const ProductModel = require('../models/ProductModel');

const loginPage = (req, res) => {
    if (res.locals.users) {
        return res.redirect('dashboard')
    }
    return res.render('login')
}
const loginUser = (req, res) => {
    return res.redirect('dashboard')
}
const dashboardPage = (req, res) => {
    return res.render('dashboard')
}
const registerPage = (req, res) => {
    return res.render('register')
}
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        await UserModel.create({
            name: name,
            email: email,
            password: password
        })
        console.log("user successfully create");
        return res.redirect('/');
    } catch (err) {
        console.log(err);
        return false;

    }
}
const logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            console.log(err);
            return false;
        }
        return res.redirect('/');
    });
}

const addProduct = async(req,res) => {
       try {

        const {name,price,description,qty,image} = req.body;
        
        await ProductModel.create({
            name:name,
            price:price,
            description:description,
            qty:qty,
            image : req.file.path
        })
        console.log("Product Add Succesfully!!");
        res.redirect('/view');
        
       } catch (err) {
        console.log(err);
        return false;
       }
}

const viewProduct = async (req,res) => {
    try {
        const product = await ProductModel.find({});
        console.log("Product SUccesfully Fetch!");
        
        return res.render('view',{product})
        
    } catch (err) {
        console.log(err);
        return false;
    }
}

const Delete = async (req,res) => {
    try {
        const id = req.query.deleteid
         await  ProductModel.findByIdAndDelete(id);
        console.log("Product Succesfully deleted!");
        return res.redirect('/view');
        
    } catch (err) {
        console.log(err);
        return false;
    }
}

const edit = async (req,res) => {
   try {
    const id = req.query.id;
    const single =  await  ProductModel.findById(id);
    console.log(single);
    
    return res.render('edit',{single:single});

   } catch (err) {
    console.log(err);
    return false;
   }
}

const updateProduct = async (req,res) => {
    try {
        const { editid, name, price, description,qty } = req.body;
        console.log(req.body);
        
        
        const single = await ProductModel.findById(editid);

        if (req.file) {
            // Delete the old image file
            fs.unlinkSync(single.image);

            await ProductModel.findByIdAndUpdate(editid, {
                name: name,
                price: price,
                description: description,
                qty:qty,
                image: req.file.path
            });
            console.log("Record updated with new image");
            return res.redirect('/view');
        } else {
            await ProductModel.findByIdAndUpdate(editid, {
                name: name,
                price: price,
                description: description,
                qty:qty,
                image: single.image // Keep the old image if no new one is provided
            });
            console.log("Record updated without new image");
            return res.redirect('/view');
        }
    } catch (err) {
        console.log(err);
        return false
    }
}

const logoutUser = (req,res) =>{
    req.logout((err) =>{
        console.log(err);
        return false;
    })
    return res.redirect('/')
}
module.exports = {
    loginPage, loginUser, dashboardPage, registerUser, registerPage, logout , addProduct , logoutUser , viewProduct , Delete , edit , updateProduct
}