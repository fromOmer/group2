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
const csv = require("csvtojson");
const {create_Trainings} = require("./DB/createdb");

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({extended:true}));
//const CRUD =require('./DB/CRUD');
app.use(cookieparse());



app.use(express.static(path.join(__dirname, "static"))); // find the folder static


//routing
app.get('/', (req, res) => {
   res.render('Home-page');
});


//app.get('/Coach', (req, res) => {
//   res.render('Coach');
//});

app.get('/Sign_in', (req, res) => {
   res.render('SignIn');
});

app.get('/Sign_up', (req, res) => {
   res.render('Sign-Up');
});

app.get('/classes', (req, res) => {
   res.render('Training');
});

app.get('/Registaration', (req, res) => {
   res.render('Registration for classes');
});

app.get('/Contact', (req, res) => {
   res.render('Contact-us');
});

app.get('/Table-classes', (req, res) => {
   res.render('Table of classes');
});

// app.get('/my-profile', (req, res) => {
//    res.render('User profile');
//  });

app.get('/Review', (req, res) => {
   res.render('Review');
});



// Define the path to your CSV file
const csvFilePath = './DB/coachers.csv';

app.get('/Coach', (req, res) => {
      res.render('Coach');
});



// Creating the DB
app.get ('/DROP_users',CreateDB.DROP_users );
app.get ('/create_Trainings',CreateDB.create_Trainings );
app.get ('/CreateTable_users',CreateDB.CreateTable_users );
app.get ('/create_coachers',CreateDB.create_coachers );
app.get('/Create_table_training',CreateDB.create_table_training);
app.get('/Insert_table_training',CreateDB.InsertData_table_training);
app.get ('/InsertData_Trainings',CreateDB.InsertData_Trainings );
app.get ('/InsertData_coachers',CreateDB.InsertData_coachers );
app.get ('/InsertData_users',CreateDB.InsertData_users );
app.get ('/Show_Training',CreateDB.Show_Training );
app.get ('/Show_Coachers',CreateDB.Show_Coachers );
app.get ('/Show_users',CreateDB.Show_users );
app.get ('/Drop_table_trining',CreateDB.Drop_table_training );
app.get ('/Show_table',CreateDB.Show_table );




//adding new users , review , contact us ..

//app.post("/createNewCustomer", CRUD_USER.createNewUser);
app.post("/createNewCustomer", CRUD_TRY.createNewUser);
app.post("/CheckUser", CRUD_TRY.FindUser);
app.get('/my-profile', CRUD_TRY.MyProfile);




//set up listen
app.listen(port ,()=> {
    console.log("server is running on port", port) ;
})