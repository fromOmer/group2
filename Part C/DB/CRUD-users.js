const express = require('express');
const app =express();
const mysql = require("./db");
const path = require("path");
const cookieparse = require ('cookie-parser');
app.use(cookieparse());
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
const BodyParser = require('body-parser');
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({extended:true}));

const user ={
        "id": '',
        "firstname": '',
        "lastname": '',
        "email": '',
        "password": '',
        "Health": ''
};

const createNewUser = (req,res)=> {
    //validate that body is not empty
    if (!req.body) {
        res.status(400).send({message: "content can not be empty"});
        return;
    }
    //insert data to json
      const NewUser = {
        "id": req.body.ID,
        "firstname": req.body.FirstName,
        "lastname": req.body.LastName,
        "email": req.body.Email,
        "password": req.body.password,
        "Health": req.body.Health
    };

    mysql.query("INSERT INTO users SET ?", NewUser, (err, mysqlres) => {
       if (err) {
          console.log("error: ", err);
          res.status(400).json({ message: "error in creating user: " + err }); // Change send to json
          return;
          }
       else {
         user.id = NewUser.id;
         user.firstname = NewUser.firstname;
         user.lastname = NewUser.lastname;
         user.password = NewUser.password;
         user.email = NewUser.email;
         user.Health = NewUser.Health;
         console.log("created new user: ", { id: mysqlres.insertId });
         res.status(201).json({ message: "User created", id: mysqlres.insertId });
       };
    });
};


const FindUser = (req,res)=> {
    //validate that body is not empty
    if (!req.body) {
        res.status(400).send({message: "content can not be empty"});
        return;
    }
    //insert data to json
    const User_exists = {
        "id": req.body.ID,
        "password": req.body.password
    };
    mysql.query("SELECT  *  FROM users where id = ?", User_exists.id, (err, mysqlres) => {
        if (err) {
            console.log("error in getting all user " + err);
            res.status(400).send({message: "error in getting all user " + err})
            return;
        }
        if ( mysqlres.length == 0) {
        res.send('<script>alert("The ID is not correct! please try again "); window.location.href = "/Sign_in";</script>');
        return;
        }
        else {
             mysql.query("SELECT  *  FROM users  where password like ?", User_exists.password + "%", (err, mysqlres) => {
                if (err)  {
                    console.log("error in getting all user " + err);
                    res.status(400).send({message: "error in getting all user " + err})
                    return;
                }
                if ( mysqlres.length == 0) {
                     res.send('<script>alert("The password is not correct! please try again "); window.location.href = "/Sign_in";</script>');
                     //res.render('Loginscreen', {var1:  "You successfuly sign in" });
                     return;
                 }
                 else  {
                     console.log("User sign in successfuly" );
                     //res.render('Loginscreen', {var1:  "You successfuly sign in" });
                                    user.id=User_exists.id;
                                    user.firstname=User_exists.firstname;
                                    user.lastname=User_exists.lastname;
                                    user.password=User_exists.password;
                                    user.email=User_exists.email;
                                    user.Health=User_exists.Health;
                         res.cookie ('UserID',req.body.ID);
                         console.log(req.cookies);
                        res.send('<script>alert("The user is sign in "); window.location.href = "/";</script>');

                     return;
                 }
            });
        };
    });
};


const trainings = {
                      "time": '',
                      "day": '',
                      "coacherName": '',
                      "trainingName": ''
};

const MyProfile=(req,res)=> {
    //validate that body is not empty
    if (!req.body) {
        res.status(400).send({message: "content can not be empty"});
        return;
    }
    else {
        const query1 = "SELECT u.firstname, u.lastname, u.Health, t.time_training, t.day_training, t.training, t.Coacher_name FROM users u LEFT JOIN table_of_training t ON u.id = t.user_id WHERE u.id = ?";
        mysql.query(query1, user.id, (err, mysqlres) => {
            if (err) {
                console.log("error in getting all user " + err);
                res.status(400).send({message: "error in getting all user " + err})
                return;
            } else {
                const query2 = "SELECT u.firstname, u.lastname, u.Health, t.time_training, t.day_training, t.training, t.Coacher_name FROM users u LEFT JOIN table_of_training t ON u.id = t.user_id WHERE u.id = ?";
                mysql.query(query2, req.cookies?.UserID, (err, mysqlres1) => {
                    if (err) {
                        console.log ( req.cookies?.UserID);
                        console.log("error in getting all user " + err);
                        res.status(400).send({message: "error in getting all user " + err})
                        return;
                    } else {
                        console.log(mysqlres[0]);
                        const trainings = mysqlres.map(training => {
                            return {
                                "time": training.time_training,
                                "day": training.day_training,
                                "coacherName": training.Coacher_name,
                                "trainingName": training.training
                            };
                        });
                        console.log(trainings);
                        res.render('User profile', {
                            variable1: 'Hi ' + mysqlres1[0].firstname + ' Welcome back',
                            variable3: 'Health Level: ' + mysqlres1[0].Health,
                            variable4: 'Your upcoming lessons:',
                            variable5: trainings
                        });
                        return;
                    };
                });
                return;
            };
        });
    };
};

const checkTrining = (req,res)=> {
          const newReview = {
        "time_training": req.body.time,
        "day_training": req.body.Day,
        "user_id":user.id ,
        "review":req.body.description ,
         "score":req.body.score
    };
    const Q2 = "select * from table_of_training where user_id is not null";
    mysql.query(Q2, (err, mysqlres2) => {
                if (err) {
                    console.log("error in getting all the trinings " + err);
                    res.status(400).send({message: "error in getting all trinings " + err})
                    return;
                } else {
                    console.log(mysqlres2);
                    res.redirect('/Registaration', {V1: mysqlres2});
                    return;
                };
    });
};


module.exports= {checkTrining,createNewUser,FindUser,MyProfile};