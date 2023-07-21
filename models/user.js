var db = require("./database");
exports.list = function (callback) {
  let sql = `SELECT *  FROM users`;
  db.query(sql, function (err, d) {
    callback(d);
  });
};
exports.create = function (data, callback) {
  //hàm chèn user mới vào table
  let sql = "INSERT INTO users SET ?";
  db.query(sql, data, function (err, d) {
    callback(d);
  });
};
exports.update = function (id, data, callback) {
  let sql = "UPDATE users  SET ? WHERE id = ?";
  db.query(sql, [data, id], (err, d) => {
    if (err) throw err;
    callback();
  });
};
exports.delete = function (id, callback) {
  let sql = "DELETE FROM users WHERE id = ?";
  db.query(sql, id, (err, d) => {
    if (err) throw err;
    callback();
  });
};
exports.read = function (id, callback) {
  let sql = "SELECT * FROM users WHERE id = ?";
  db.query(sql, id, (err, d) => {
    if (d.length < 1) data = { thongbao: `Id  khong tim thay` };
    else {
      data = d[0];
    }
    callback(data);
  });
};
exports.readByEmail = function (email, callback) {
  let sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, email, (err, d) => {
    if (d.length < 1) data = { thongbao: `Id  khong tim thay` };
    else {
      data = d[0];
    }
    callback(data);
  });
};
exports.login = function (un, callback) {
  let sql = "SELECT * FROM users WHERE username = ?";
  db.query(sql, un, (err, d) => {
    if (d.length < 1) data = { thongbao: `Id khong tim thay` };
    else {
      data = d[0];
    }
    callback(data);
  });
};
