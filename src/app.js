//console.log("jai shree ram");
const express = require('express');
const app=express();
//const hbs=require("hbs");
require('./db/db');
let port= process.env.PORT ||3000;
const path=require('path');
const empCollection=require('./model/model');

const static_path=path.join(__dirname,"../public");
const template_path= path.join(__dirname,'../template/views');
//const partials_path= path.join(__dirname,"../templates/partials");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(static_path));
app.set('view engine','hbs');
app.set('views',template_path);
//hbs.registerPartials(partials_path);
    app.get('/',(req,res)=>{
        res.render('index')
    });
    app.post('/empdata',async(req,res)=>{
        try{
           const password=req.body.password;
           const cpassword=req.body.cpassword;
           if(password === cpassword){
               const empData = new empCollection({
                   name:req.body.name,
                   email:req.body.email,
                   phone:req.body.phone,
                   password:req.body.password,
                   cpassword:req.body.cpassword
               })
               const postData = await empData.save();
               res.send(postData);
               } else{
                   res.send("passwords are not matching...")
               }
            
   /*const registered = await Register.save();
   res.send(postData);
           }else{
               res.send("passwords are not matching")
           }*/
   
        }catch(error){
           res.status(400).send(error);
        }
     } )
app.listen(port, ()=>{
console.log(`server running at ${port}`);
})

