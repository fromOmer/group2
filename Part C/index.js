//import and init modules
const express = require('express');
const app =express();
const path = require('path');
const BodyParser = require('body-parser');
const cookieparse = require ('cookie-parser');
const mysql = require('./DB/db');
const port = 3030;
const CreateDB = require('./DB/createdb.js');
const CRUD_TRY = require('./DB/CRUD-users.js');
const fs = require('fs');
const stringify = require('csv-stringify').stringify;
const { parse } = require("csv-parse");
const CSVToJSON = require('csvtojson');

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({extended:true}));
//const CRUD =require('./DB/CRUD');
app.use(cookieparse());
app.set('view engine','pug');


app.use(express.static(path.join(__dirname, "static"))); // find the folder static
app.set ('views', path.join(__dirname,'views'));


//routing
app.get('/',(req,res)=>{
   res.sendFile(path.join (__dirname,"views/Home-page.html"));
});
app.get('/Coach',(req,res)=>{
   res.sendFile(path.join (__dirname,"views/Coach.html"));
});

app.get('/Sign_in',(req,res)=>{
   res.sendFile(path.join (__dirname,"views/SignIn.html"));
});

app.get('/Sign_up',(req,res)=>{
     res.sendFile(path.join (__dirname,"views/Sign-Up.html"));
});

app.get('/classes',(req,res)=>{
   res.sendFile(path.join (__dirname,"views/Training.html"));
});

app.get('/Registaration',(req,res)=>{
   res.sendFile(path.join (__dirname,"views/Registration for classes.html"));
});

app.get('/Contact',(req,res)=>{
   res.sendFile(path.join (__dirname,"views/Contact-us.html"));
});
app.get('/Table-classes',(req,res)=>{
   res.sendFile(path.join (__dirname,"views/Table of classes.html"));
});

app.get('/my-profile',(req,res)=>{
   res.sendFile(path.join (__dirname,"views/User profile.html"));
});
app.get('/Review',(req,res)=>{
   res.sendFile(path.join (__dirname,"views/Review.html"));
});


// Creating the DB
app.get ('/DROP_users',CreateDB.DROP_users );
app.get ('/create_Trainings',CreateDB.create_Trainings );
app.get ('/CreateTable_users',CreateDB.CreateTable_users );
app.get ('/create_coachers',CreateDB.create_coachers );
app.get ('/InsertData_Trainings',CreateDB.InsertData_Trainings );
app.get ('/InsertData_coachers',CreateDB.InsertData_coachers );
app.get ('/InsertData_users',CreateDB.InsertData_users );
app.get ('/Show_Training',CreateDB.Show_Training );
app.get ('/Show_Coachers',CreateDB.Show_Coachers );
app.get ('/Show_users',CreateDB.Show_users );


//adding new users , review , contact us ..

//app.post("/createNewCustomer", CRUD_USER.createNewUser);
app.post("/createNewCustomer", CRUD_TRY.createNewUser);
app.post("/CheckUser", CRUD_TRY.FindUser);





//set up listen
app.listen(port ,()=> {
    console.log("server is running on port", port) ;
})