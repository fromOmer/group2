//import and init modules
const express = require('express');
const app =express();
const path = require('path');
const BodyParser = require('body-parser');
const cookieparse = require ('cookie-parser');
const mysql = require('./DB/db');
const port = 3000;
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

app.get('/contactSent', (req, res) => {

    res.render('Home-page');
});

app.get
app.get('/Sign_in', (req, res) => {
   res.render('SignIn');
});

app.get('/Sign_up', (req, res) => {
   res.render('Sign-Up');
});

app.get('/classes', (req, res) => {
    const Q1 = 'select * from Trainings';
    mysql.query(Q1, (err, mysqlres)=>{
        if (err) throw err;
        res.render('Training', {V1 : mysqlres})
    })
});

app.get('/Registaration', (req, res) => {
    const q1='select * from '
   res.render('Registration for classes');
});


app.get('/Contact', (req, res) => {
   res.render('Contact-us');
});

app.get('/Disconnect', (req, res) => {
    const UserID = req.cookies.UserID;
      if (UserID) {
        res.clearCookie('UserID');
        console.log("HEY!!!!!!!!")
        res.redirect('/');
      } else {
        res.send('Could not disconnect');
      }
});

app.get('/Table-classes', (req, res) => {
  const Q1 = 'SELECT time_training, day_training, GROUP_CONCAT(CONCAT(Coacher_name, \' - \', training) SEPARATOR \'\\n\') AS details FROM table_of_training_no_user GROUP BY day_training,time_training ORDER BY FIELD(day_training, \'Sunday\', \'Monday\', \'Tuesday\', \'Wednesday\', \'Thursday\', \'Friday\', \'Saturday\'),time_training\n ';
  mysql.query(Q1, (err ,mysqlres) => {
    if (err) throw err;
    const scheduleData = mysqlres.map(row => {
      return {
        time_training: row.time_training,
        day_training:row.day_training,
        details: row.details ? row.details.split('\n') : []
      };
    });
    console.log(scheduleData[0].details);
    res.render('Table of classes.pug', { Data: scheduleData });
  });
});


app.get('/Review', (req, res) => {
   res.render('Review');
});


app.get('/Coach', (req, res) => {
   const Q1 = 'select * from Coachers';
    mysql.query(Q1, (err, mysqlres)=>{
        if (err) throw err;
        res.render('Coach', {V1 : mysqlres})
    })
});



// Creating the database
app.get('/init', (req, res) => {
    res.render('Init');
});

app.get ('/createAll',CreateDB.create_AllTables);
app.get ('/dropAll',CreateDB.drop_Alltables);
app.get ('/insertAll',CreateDB.inset_Alldata );
app.get ('/Show_Training',CreateDB.Show_Training );
app.get ('/Show_Coachers',CreateDB.Show_Coachers );
app.get ('/Show_users',CreateDB.Show_users );
app.get ('/Show_table',CreateDB.Show_table );
app.get ('/Show_table_trainigs_no',CreateDB.Show_table_trainigs_no );


//adding new users , review , contact us ..

//app.post("/createNewCustomer", CRUD_USER.createNewUser);
app.post("/createNewCustomer", CRUD_TRY.createNewUser);
app.post("/CheckUser", CRUD_TRY.FindUser);
app.get('/my-profile', CRUD_TRY.MyProfile);
app.post ('/registerTraining', CRUD_TRY.registerTraining);
app.get('/getTrainings',CRUD_TRY.getTrainings);
app.get('/mytrainings_review',CRUD_TRY.mytrainings_review);
app.post('/review_training',CRUD_TRY.review_training);



//set up listen
app.listen(port ,()=> {
    console.log("server is running on port", port) ;
})