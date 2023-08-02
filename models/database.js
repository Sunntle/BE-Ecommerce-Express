const mysql = require("mysql");
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "asmnodejs",
  multipleStatements: true,
});
db.connect(() => console.log("Da ket noi database !"));
module.exports = db;
//lệnh exports để xuất (public) ra, cho ngoài module dùng được db
