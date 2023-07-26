var db = require("./database");
exports.list = function (callback) {
  let sql = `SELECT *  FROM color`;
  db.query(sql, function (err, d) {
    callback(d);
  });
};
exports.delete = function (id, color_id, callback) {
  let sql = `DELETE FROM product_colors WHERE product_id = ? AND color_id = ?`;
  db.query(sql, [id, color_id], (err, d) => {
    if (err) throw err;
    callback(d);
  });
};
