var SQL = require('./db');
const path = require('path');
const csv=require('csvtojson');


///create and insert users
const CreateTable_users = (req,res)=> {
    var Q_users = "CREATE TABLE IF NOT EXISTS users ( id int(11) NOT NULL PRIMARY KEY , first_name varchar(255) NOT NULL , last_name varchar(255) NOT NULL, email varchar(255) NOT NULL , password varchar(255) NOT NULL , Health int(11) NOT NULL )";
    SQL.query(Q_users,(err,mySQLres)=>{
        if (err) {
            console.log("error ", err);
            res.status(400).send({message: "error in creating table Q_users"});
            return;
        }
        console.log('created table Q_users');
        res.send("table created Q_users");
        return;
    })
}
const InsertData_users = (req,res)=>{
    var Q2 = "INSERT INTO users SET ?";
    const csvFilePath= path.join(__dirname, "users.csv");
    csv()
    .fromFile(csvFilePath)
    .then((jsonObj)=>{
    console.log(jsonObj);
    jsonObj.forEach(element => {
        var NewEntry = {
            "ID": element.id,
            "Email": element.email,
            "First_Name": element.firstname,
            "Last_Name": element.lastname,
            "password":element.password,
            "health":element.health
        }
        SQL.query(Q2, NewEntry, (err,mysqlres)=>{
            if (err) {
                console.log("error in inserting data users", err);
            }
            console.log("created row sucssefuly ");
        });
    });
    })
    res.send("data read");
};

///create and insert coachers
const create_coachers = (req,res)=> {
 var Q_coachers = "CREATE TABLE IF NOT EXISTS Coachers ( id int(11) NOT NULL PRIMARY KEY ,name varchar(255) NOT NULL ,description varchar(255) NOT NULL)";
    SQL.query(Q_coachers,(err,mySQLres)=>{
        if (err) {
            console.log("error ", err);
            res.status(400).send({message: "error in creating table coachers "});
            return;
        }
        console.log('created table coachers ');
        res.send("table created coachers ");
        return;
    })
}

const InsertData_coachers = (req,res)=>{
    var Q2 = "INSERT INTO Coachers SET ?";
    const csvFilePath= path.join(__dirname, "coachers.csv");
    csv()
    .fromFile(csvFilePath)
    .then((jsonObj)=>{
    console.log(jsonObj);
    jsonObj.forEach(element => {
        var NewEntry = {
            "ID": element.id,
            "name": element.name,
            "description": element.description
        }

        SQL.query(Q2, NewEntry, (err,mysqlres)=>{
            if (err) {
                console.log("error in inserting data coachers", err);
            }
            console.log("created row sucssefuly ");
        });
    });
    })
    res.send("data read");
};

///create and insert trainings
const create_Trainings = (req,res)=> {
 var Q_Trainings = "CREATE TABLE IF NOT EXISTS Trainings ( id int(11) NOT NULL PRIMARY KEY auto_increment , name varchar(255) NOT NULL , description varchar(255) NOT NULL)";
    SQL.query(Q_Trainings,(err,mySQLres)=>{
        if (err) {
            console.log("error ", err);
            res.status(400).send({message: "error in creating table Trainings "});
            return;
        }
        console.log('created table Trainings ');
        res.send("table created Trainings ");
        return;
    })
}

const InsertData_Trainings = (req,res)=>{
    var Q2 = "INSERT INTO Trainings SET ?";
    const csvFilePath= path.join(__dirname, "trainings.csv");
    csv()
    .fromFile(csvFilePath)
    .then((jsonObj)=>{
    console.log(jsonObj);
    jsonObj.forEach(element => {
        var NewEntry = {
            "name": element.name,
            "description": element.description
        }

        SQL.query(Q2, NewEntry, (err,mysqlres)=>{
            if (err) {
                console.log("error in inserting data Trainings", err);
            }
            console.log("created row sucssefuly ");
        });
    });
    })
    res.send("data read");
};

