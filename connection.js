const mysql = require('mysql');

var mysqlConnection = mysql.createConnection({
    host     : "localhost",
    user     : "root",
    password : "root",
    database : "smart_todo",
    multipleStatements: true
});

mysqlConnection.connect(err => {
    if(!err){
        console.log('Database connected Successfully!');
    }

    else{
        console.log("Failed to connect database!");
    }
});

module.exports = mysqlConnection