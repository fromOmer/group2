var SQL = require('./db');
const path = require('path');
const csv=require('csvtojson');


///create and insert users
const CreateTable_users = (req,res)=> {
    var Q_users = "CREATE TABLE IF NOT EXISTS users ( id int(11) NOT NULL PRIMARY KEY , firstname varchar(255) NOT NULL , lastname varchar(255) NOT NULL, email varchar(255) NOT NULL , password varchar(255) NOT NULL , Health int(11) NOT NULL )";
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
    const csvFilePath= path.join(__dirname, "usersnew.csv");
    csv()
    .fromFile(csvFilePath)
    .then((jsonObj)=>{
    console.log(jsonObj);
    jsonObj.forEach(element => {
        var NewEntry = {
            "ID": element.id,
            "Email": element.email,
            "FirstName": element.firstname,
            "LastName": element.lastname,
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
 var Q_coachers = "CREATE TABLE IF NOT EXISTS Coachers ( id int(11) NOT NULL PRIMARY KEY ,name varchar(255) NOT NULL ,description LONGTEXT  NOT NULL)";
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
 var Q_Trainings = "CREATE TABLE IF NOT EXISTS Trainings ( id int(11) NOT NULL PRIMARY KEY auto_increment , name varchar(255) NOT NULL , description LONGTEXT  NOT NULL)";
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

const create_table_training = (req,res)=> {
var q_table = "CREATE TABLE IF NOT EXISTS table_of_training (id int(11) NOT NULL PRIMARY KEY auto_increment , time_training TIME NOT NULL,day_training VARCHAR(255) NOT NULL,Coacher_name VARCHAR(255) NOT NULL,coacher_id INT,user_id INT,training VARCHAR(255) NOT NULL,review LONGTEXT,score INT(11) default NULL )";
    SQL.query(q_table,(err,mySQLres)=>{
    if (err) {
            console.log("error ", err);
            res.status(400).send({message: "error in creating table of training "});
            return;
        }
        console.log('created table table of training ');
        res.send("table created table of training ");
        return;
    });
};

const Drop_table_training =(req,res)=> {
var q_table = "DROP TABLE IF EXISTS table_of_training";
    SQL.query(q_table,(err,mySQLres)=>{
    if (err) {
            console.log("error ", err);
            res.status(400).send({message: "error in creating table of training "});
            return;
        }
        console.log('DROP table table of training ');
        res.send(" drop table of training ");
        return;
    });
};
const InsertData_table_training = (req, res) => {
  const Q2 = "INSERT INTO table_of_training SET ?";
  const csvFilePath = path.join(__dirname, "Table_of_training.csv");

  csv()
    .fromFile(csvFilePath)
    .then((jsonObj) => {
      const insertPromises = jsonObj.map((element) => {
        const NewEntry = {
          time_training: element.time_training,
          day_training: element.day_training,
          Coacher_name: element.Coacher_name,
          coacher_id: element.coacher_id,
          user_id: element.user_id  ? parseInt(element.user_id) : 0, // Convert to integer or set a default value
          training: element.training,
          score: element.score,
        };
        return new Promise((resolve, reject) => {
          SQL.query(Q2, NewEntry, (err, mysqlres) => {
            if (err) {
              console.log("error in inserting data into table training", err);
              reject(err);
            } else {
              resolve();
            }
          });
        });
      });
      Promise.all(insertPromises)
        .then(() => {
          res.send("Data inserted successfully");
        })
        .catch((err) => {
          res.status(500).send("Error inserting data");
        });
    })
    .catch((err) => {
      console.log("Error reading CSV file", err);
      res.status(500).send("Error reading CSV file");
    });
};



//show coachers
const Show_Coachers = (req,res)=>{
    var Q3 = "SELECT * FROM Coachers";
    SQL.query(Q3, (err, mySQLres)=>{
        if (err) {
            console.log("error in showing Coachers ", err);
            res.send("error in showing Coachers ");
            return;
        }
        console.log("showing Coachers");
        res.send(mySQLres);
        return;
    })};

const Show_table = (req,res)=>{
    var Q3 = "SELECT  *  FROM table_of_training ";
    SQL.query(Q3, (err, mySQLres)=>{
        if (err) {
            console.log("error in showing table_of_training ", err);
            res.send("error in showing table_of_training ");
            return;
        }
        console.log("showing table_of_training");
        res.send(mySQLres);
        return;
    })};

//show coachers
const Show_Training = (req,res)=>{
    var Q3 = "SELECT * FROM Trainings";
    SQL.query(Q3, (err, mySQLres)=>{
        if (err) {
            console.log("error in showing Trainings ", err);
            res.send("error in showing Trainings ");
            return;
        }
        console.log("showing Trainings");
        res.send(mySQLres);
        return;
    })};

const Show_users = (req,res)=>{
    var Q3 = "SELECT * FROM users";
    SQL.query(Q3, (err, mySQLres)=>{
        if (err) {
            console.log("error in showing users ", err);
            res.send("error in showing users ");
            return;
        }
        console.log("showing users");
        res.send(mySQLres);
        return;
    })};

const DROP_users = (req,res)=>{
    var Q3 = "drop table users";
    SQL.query(Q3, (err, mySQLres)=>{
        if (err) {
            console.log("error in drop users ", err);
            res.send("error in drop users ");
            return;
        }
        console.log("drop users");
        res.send(mySQLres);
        return;
    })};
module.exports = {Show_table,Drop_table_training,InsertData_table_training,create_table_training,Show_Coachers,InsertData_Trainings,create_Trainings,InsertData_coachers,create_coachers,InsertData_users,CreateTable_users,Show_Training,Show_users,DROP_users};