const express = require('express');
const app =express();
const mysql = require("./db");
const path = require("path");
const cookieparse = require ('cookie-parser');
app.use(cookieparse());
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

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
    console.log("Im in");
    //insert data to json
      const NewUser = {
        "id": req.body.ID,
        "firstname": req.body.FirstName,
        "lastname": req.body.LastName,
        "email": req.body.Email,
        "password": req.body.password,
        "Health": req.body.Healthlevel
    };
// Checking that there is no existing user in the system with an email or password in this ID
   // If all the details are correct, saving a new user in the users table
    mysql.query("SELECT  *  FROM users where id = ?", NewUser.id , (err,mysqlres )=>{
        if (err) {
            console.log("error in getting all user " + err);
            res.status(400).send({message:"error in getting all user " + err})
            return;
        }
        if( mysqlres.length != 0){
                res.render('Sign_in"', { var1: "The ID is already exists- please sign in" });
   //     res.send('<script>alert("The ID already exists - Please Sign in"); window.location.href = "/Sign_in";</script>');
            return;
        }
        else{
            mysql.query("SELECT  *  FROM users  where email like ?",NewUser.email + "%", (err,mysqlres )=>{
                if (err) {
                    console.log("error in getting all user " + err);
                    res.status(400).send({message:"error in getting all user " + err})
                    return;
                }
                if( mysqlres.length != 0){
               // res.send('<script>alert("The Email already exists - Please Sign in"); window.location.href = "/Sign_in";</script>');
                  res.render('Sign_in', {var1:  "The email is already exists- please sign in " });
                return;
                }
                else{
                        mysql.query("INSERT INTO users SET ?", NewUser, (err, mysqlres) => {
                                    if (err) {
                                        console.log("error: ", err);
                                        res.status(400).send({message: "error in creating user: " + err});
                                        return;
                                    }
                                    console.log("created new user succesfully ");
                                    console.log(req.body);
                                    res.cookie ('UserID',req.body.ID);
                                    user.id=NewUser.id;
                                    user.firstname=NewUser.firstname;
                                    user.lastname=NewUser.lastname;
                                    user.password=NewUser.password;
                                    user.email=NewUser.email;
                                    user.Health=NewUser.Health;
                                   // res.send('<script>alert("The User is created!"); window.location.href = "/";</script>');
                                    res.render('Home-page', { var1: "You successfully signed in" });
                                    return;
                        });
                };
            });
        }
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
                                    console.log(req.body);
                                    user.id=User_exists.id;
                                    user.firstname=User_exists.firstname;
                                    user.lastname=User_exists.lastname;
                                    user.password=User_exists.password;
                                    user.email=User_exists.email;
                                    user.Health=User_exists.Health;
                         res.cookie ('UserID',req.body.ID);
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
                    }
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
                        variable1: 'Hi ' + mysqlres[0].firstname + ' Welcome back',
                        variable2: 'Name: ' + mysqlres[0].firstname + ' ' + mysqlres[0].lastname,
                        variable3: 'Health Level: ' + mysqlres[0].Health,
                        variable4: 'Your upcoming lessons:',
                        variable5: trainings
                    });
                    return;
                });
                return;
            }
};

//
// const MyProfile=(req,res)=> {
//     //validate that body is not empty
//     if (!req.body) {
//         res.status(400).send({message: "content can not be empty"});
//         return;
//     }
//     else {
//         mysql.query("SELECT  *  FROM users where id = ?", user.id, (err, mysqlres1) => {
//             if (err) {
//                 console.log("error in getting all user " + err);
//                 res.status(400).send({message: "error in getting all user " + err})
//                 return;
//             }
//             else {
//                 mysql.query("SELECT  *  FROM table_of_training where user_id = ?", user.id, (err, mysqlres) => {
//                     console.log(mysqlres);
//                     console.log(mysql.query);
//                     console.log(mysqlres[0]);
//                     if (err) {
//                         console.log("error in getting all user " + err);
//                         res.status(400).send({message: "error in getting all user " + err})
//                         return;
//                     }
//                     console.log(mysqlres[0]);
//                     const trainings = mysqlres.map(training => {
//                         return {
//                             "time": training.time_training,
//                             "day": training.day_training,
//                             "coacherName": training.Coacher_name,
//                             "trainingName": training.training
//                         };
//                     });
//                     console.log(trainings);
//                     res.render('User profile', {
//                         variable1: 'Hi ' + mysqlres1[0].firstname + ' Welcome back',
//                         variable2: 'Name: ' + mysqlres1[0].firstname + ' ' + mysqlres1[0].lastname,
//                         variable3: 'Health Level: ' + mysqlres1[0].Health,
//                         variable4: 'Your upcoming lessons:',
//                         variable5: trainings
//                     });
//                     return;
//                 });
//                 return;
//             }
//         });
//     }
// };

module.exports= {createNewUser,FindUser,MyProfile};