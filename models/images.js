var db = require("./database");
exports.createImg = function (data, callback) {
  let sql = "INSERT INTO images (img,idSp) VALUES ?";
  db.query(sql, [data], function (err, d) {
    callback(d);
  });
};

exports.deleteProductImg = function (product_id, callback) {
  let sql = `DELETE FROM images WHERE idSp = ? `;
  db.query(sql, product_id, (err, d) => {
    if (err) throw err;
    callback(d);
  });
};
