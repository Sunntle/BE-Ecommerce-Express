const mysql = require('mysql2');
require("dotenv").config();

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST, // Update this line
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  port: process.env.DATABASE_PORT,
  multipleStatements: true,
});
const handleConnectDb = (req, res, next) =>{
  db.connect((err,connection) =>
  {
      console.log("Da ket noi database !")
      if (err) {
          console.log("Bug in connect db", err);
      }
      // next()
  });
}
handleConnectDb()
module.exports = db;
