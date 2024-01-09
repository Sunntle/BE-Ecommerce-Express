var db = require("../config/database");

exports.getImgProduct = function (idSp, callback) {
  let sql = "SELECT * FROM images WHERE idSp =?";
  db.query(sql, idSp, function (err, d) {
  if(err) console.log(err);
    callback(d);
  });
};

exports.createImg = function (data, callback) {
  let sql = "INSERT INTO images (img,idSp) VALUES ?";
  db.query(sql, [data], function (err, d) {
  if(err) console.log(err);
    callback(d);
  });
};

exports.deleteProductImg = function (product_id, callback) {
  let sql = `DELETE FROM images WHERE idSp = ? `;
  db.query(sql, product_id, (err, d) => {
    if (err) throw err;
  if(err) console.log(err);
    callback(d);
  });
};
exports.deleteImg = function (product_id, img, callback) {
  let sql = `DELETE FROM images WHERE img LIKE CONCAT('%', ? , '%') and idSp = ?`;
  db.query(sql, [img, product_id], (err, d) => {
    if (err) throw err;
  if(err) console.log(err);
    callback(d);
  });
};
