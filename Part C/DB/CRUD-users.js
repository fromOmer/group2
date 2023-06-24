const express = require('express');
const app =express();
const mysql = require("./db");
const path = require("path");
const cookieparse = require ('cookie-parser');
app.use(cookieparse());
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));



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
    const User = {
        "id": req.body.ID,
        "password": req.body.password
    };
    mysql.query("SELECT  *  FROM users where id = ?", User.id, (err, mysqlres) => {
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
             mysql.query("SELECT  *  FROM users  where password like ?", User.password + "%", (err, mysqlres) => {
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
                         res.cookie ('UserID',req.body.ID);
                        res.send('<script>alert("The user is sign in "); window.location.href = "/";</script>');
                     return;
                 }
            });
        };
    });
};

const user ={
        "id": '',
        "firstname": '',
        "lastname": '',
        "email": '',
        "password": '',
        "Health": ''
};
// const look = (req, res)=>{
//         res.render('User profile',{
//             firstname: user.firstname ,
//             lastname: user.lastname ,
//             id: user.id,
//             Health: user.Health,
//             password: user.password ,
//             email: user.email,
//             variable1: '  Hi ' + user.firstname + ' Welcome back',
//             variable2: 'Name:'+user.firstname + user.lastname,
//             variable3: 'Health Level:' + user.Health ,
//             variable4: 'Your upcoming lessons'
//         });
//         return;
//    };
// Displaying the user's personal profile page
// const MyProfile= (req, res)=>{
//     res.render('User profile',{
//         variable1: '  Hi ' + user.firstname + ' Welcome back',
//         variable2: 'Name:'+user.firstname + user.lastname,
//         variable3: 'Health Level:' + user.Health ,
//         variable4: 'Your upcoming lessons'
//      });
// return;
// };


/////checkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
const New=(req,res)=> {
    //validate that body is not empty
    if (!req.body) {
        res.status(400).send({message: "content can not be empty"});
        return;
    }
    //insert data to json
    const User = {
        "id": req.body.ID
    };
    mysql.query("SELECT  *  FROM users where id = ?", User.id, (err, mysqlres) => {
        if (err) {
            console.log("error in getting all user " + err);
            res.status(400).send({message: "error in getting all user " + err})
            return;
        }
        const userData = mysqlres[0];
        const id = userData.id;
        const lastname = userData.lastname;
        const firstname = userData.firstname;
        const Health = userData.Health;
        const email = userData.email;
        res.render('User profile', {
            variable1: '  Hi ' + firstname + ' Welcome back',
            variable2: 'Name:' + firstname + ' ' + lastname,
            variable3: 'Health Level:' + Health,
            variable4: 'Your upcoming lessons'
        });
        return;
    });
};
module.exports= {createNewUser,FindUser,New};