const mysql = require("mysql");
require("dotenv").config();
const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: "",
  database: process.env.DATABASE_NAME,
  multipleStatements: true,
});
db.connect(() => console.log("Da ket noi database !"));
module.exports = db;
//lệnh exports để xuất (public) ra, cho ngoài module dùng được db
