var db = require("../config/database");
exports.list = function (callback) {
  let sql = `SELECT *  FROM size`;
  db.query(sql, function (err, d) {
  if(err) console.log(err);
    callback(d);
  });
};

exports.create = function (data, callback) {
  let sql = "INSERT INTO size SET ?";
  db.query(sql, data, function (err, d) {
  if(err) console.log(err);
    callback(d);
  });
};

exports.update = function (id, data, callback) {
  let sql = "UPDATE size  SET ? WHERE id = ?";
  db.query(sql, [data, id], (err, d) => {
    if (err) throw err;
    callback();
  });
};

exports.read = function (id, callback) {
  let sql = "SELECT * FROM size WHERE id = ?";
  db.query(sql, id, (err, d) => {
    if (d.length < 1) data = { thongbao: `Id ${id} khong tim thay` };
    else {
      data = d[0];
    }
    callback(data);
  });
};
