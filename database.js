// configure the MySQL connection

const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'myProject'
  });
  
  // connect to the database
  connection.connect(function(err) {
    if (err) throw err;
    console.log('Connected to MySQL database');
  });