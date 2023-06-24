const mysql = require("./db");
const path = require("path");

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
        res.send('<script>alert("The ID already exists - Please Sign in"); window.location.href = "/Sign_in";</script>');
          //  res.render('newaccount', {var1:  "The ID is already exists- please sign in " });
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
                res.send('<script>alert("The Email already exists - Please Sign in"); window.location.href = "/Sign_in";</script>');
                //  res.render('newaccount', {var1:  "The ID is already exists- please sign in " });
                return;
                }
                else{
                        mysql.query("INSERT INTO users SET ?", NewUser, (err, mysqlres) => {
                                    if (err) {
                                        console.log("error: ", err);
                                        res.status(400).send({message: "error in creating user: " + err});
                                        return;
                                    }

                                    console.log("created new user succesfully "+ mysqlres);
                                    res.send('<script>alert("The User is created!"); window.location.href = "/";</script>');
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
                     res.sendFile(path.join(__dirname, "../views/Home-page.html"));
                     return;
                 }
                 else  {
                     console.log("User sign in successfuly" + mysqlres);
                     //res.render('Loginscreen', {var1:  "You successfuly sign in" });
                     res.sendFile(path.join(__dirname, "../views/Home-page.html"));
                     return;
                 }
            });
        };
    });
};





module.exports= {createNewUser,FindUser};