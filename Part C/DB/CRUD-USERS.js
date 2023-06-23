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
    }
    console.log(req.body);
    //create sql query
    const Q1 = "insert into users set ?";
    //run the query
    mysql.query(Q1, NewUser, (err, mysqlres) => {
        if (err) {
            console.log("error in running query insert users via form", err);
            res.status(400).send({message: "Sign up Filed , Please contact us"});
            return;
        }
        console.log("created user, user id:", {id: mysqlres.insertId});
        res.send("you have signed up");
        res.sendfile(path.join(__dirname, "../views/Home-page.html"));
        return;
    });
};





//exports

module.exports= {createNewUser};