var db = require("../config/database");
exports.createProductSize = function (data, callback) {
  let sql = "INSERT INTO product_sizes (product_id,size_id) VALUES ?";
  db.query(sql, [data], function (err, d) {
  if(err) console.log(err);
    callback(d);
  });
};

exports.deleteProductSize = function (id, callback) {
  let sql = `DELETE FROM product_sizes WHERE product_id = ? `;
  db.query(sql, id, (err, d) => {
    if (err) throw err;
  if(err) console.log(err);
    callback(d);
  });
};
