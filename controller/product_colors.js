var db = require("../config/database");
exports.createProductColor = function (data, callback) {
  let sql = "INSERT INTO product_colors (product_id,product_color) VALUES ?";
  db.query(sql, [data], function (err, d) {
  if(err) console.log(err);
    callback(d);
  });
};

exports.deleteProductColor = function (id, callback) {
  let sql = `DELETE FROM product_colors WHERE product_id = ?`;
  db.query(sql, id, (err, d) => {
    if (err) throw err;
  if(err) console.log(err);
    callback(d);
  });
};
