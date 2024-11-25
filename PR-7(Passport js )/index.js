    const express = require('express');

    const port = 9000;

    const app = express();

    const path = require('path')

    const database = require('./config/db');

    app.set('view engine' , 'ejs');

    app.use("/uploads",express.static(path.join(__dirname,"uploads")))

    app.use("/images", express.static(path.join(__dirname, "images"))); // Serve images from the images folder


    const passport =  require('passport');

    const passportLocal = require('./config/passportLocal');

    const session = require('express-session');

    app.use(session({
        secret:'krishn',
        resave:false,
        saveUninitialized: true,
        cookie:{
            maxAge : 1000*60*60*24
        }
    }));

    app.use(passport.session());
    app.use(passport.initialize());
    app.use(passport.setuser);

    app.use(express.urlencoded());
    const bodyParser = require('body-parser');
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    app.use('/' , require('./routes/indexRoutes'));

    app.listen(port , (err) =>{
        if(err){
            console.log(err);
            return false;
        }
        console.log(`Server is running on := ${port}`);
    })