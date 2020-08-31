var mysql = require('mysql');

var mycon = mysql.createConnection({
  host: "localhost",
  user: "test@gmail.com",
  password: "",
  port: 3600
});

mycon.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});