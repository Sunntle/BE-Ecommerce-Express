const mysql = require("mysql");
require("dotenv").config();
const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  port: process.env.DATABASE_PORT,
  multipleStatements: true,
});
db.connect((err,connection) =>
{
    console.log("Da ket noi database !")
    if (err) {
        console.log(err);
        return;
    }
});
module.exports = db;
//lệnh exports để xuất (public) ra, cho ngoài module dùng được db
