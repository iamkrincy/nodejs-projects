const express = require('express');
const app = express();

const port = 9000;

let users = [];

 app.set('view engine', 'ejs')
 app.use(express.urlencoded())

app.get('/' , (req,res) =>{
    return res.render('index' , {
        all : users
    })
})

app.post('/insertTask' , (req,res) =>{
    const {task,status,deadline} = req.body;

    let obj ={
        id : Math.floor(Math.random() * 10000) ,
        task,
        status,
        deadline
    };

    users.push(obj);
    console.log("Task Succesfully Added");
    return res.redirect('/');
    
})

app.get('/delete' , (req,res) =>{
    const id = req.query.id;
    const d = users.filter(value => value.id != id);
    users = d;
    return res.redirect('/')
})

app.get('/edit' , (req,res) =>{
    const id = req.query.id;

    const single = users.find((value) => value.id == id);
    return res.render('edit' , {single});
})

app.post('/update' , (req,res) =>{
    const {task,status,deadline,id} = req.body;

    let up = users.map((value) =>{
        if(value.id == id){
            value.task = task;
            value.status = status;
            value.deadline = deadline;
        }
        return value;
    });

    users = up;
    console.log('Task Updated Succesfully');
    return res.redirect('/')
})


app.listen(port , (err) =>{
    if (err) {
        console.log(err);
        return false;
    }
    console.log('server is running');
})