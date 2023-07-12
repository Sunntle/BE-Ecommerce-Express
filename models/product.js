var db = require("./database");
const sqlSyntaxBasic = `SELECT p.*, GROUP_CONCAT(DISTINCT i.img ORDER BY i.img DESC) AS allImg, GROUP_CONCAT(DISTINCT s.size) AS allSize,GROUP_CONCAT(DISTINCT c.color) AS allColor FROM sanpham p LEFT JOIN product_sizes ps ON p.id = ps.product_id LEFT JOIN size s ON ps.size_id = s.size_id LEFT JOIN product_colors pc ON p.id = pc.product_id LEFT JOIN color c ON pc.product_color = c.color_id LEFT JOIN images i ON p.id = i.idSp `;
//DELETE FROM product_sizes WHERE product_id = <your_product_id> AND size_id = <your_size_id>;
function queryList(
  sqlQuery,
  limit = undefined,
  offset = undefined,
  sort = undefined,
  order = "DESC",
  q = undefined,
  res = undefined
) {
  let sql = sqlQuery;
  let arrParams = [];
  let whereExists = sql.includes("WHERE") ? true : false;
  if (q && !sql.includes("WHERE")) {
    sql = sql + ` WHERE p.name LIKE CONCAT('%', ? , '%')`;
    arrParams.push(q);
    whereExists = true;
  }
  if (res) {
    for (const [key, value] of Object.entries(res)) {
      const queryParams = key.split("_");
      let condition;
      if (queryParams[1] == "lte") condition = "<=";
      else if (queryParams[1] == "gte") condition = ">=";
      else {
        condition = "LIKE";
      }
      if (whereExists) {
        sql += ` AND `;
      } else {
        sql += ` WHERE `;
        whereExists = true;
      }
      sql +=
        condition === "LIKE" ? `${queryParams[0]} ${condition} "${value}"` : `${queryParams[0]} ${condition} ${value} `;
    }
  }
  sql += ` GROUP BY p.id`;
  if (sort) {
    sql = sql + ` ORDER BY ${sort} ${order}`;
  }

  if (limit && offset) {
    offset = (offset - 1) * limit;
    sql = sql + ` LIMIT ? OFFSET ?`;
    arrParams.push(+limit, +offset);
  } else if (limit && offset == undefined) {
    sql = sql + ` LIMIT ? `;
    arrParams.push(+limit);
  } else if (offset && limit == undefined) {
    offset = (offset - 1) * 16;
    sql = sql + ` LIMIT 16 OFFSET ? `;
    arrParams.push(+offset);
  }
  console.log({
    sql: sql,
    arrParams: arrParams,
  });
  return {
    sql: sql,
    arrParams: arrParams,
  };
}
exports.list = function (
  limit = undefined,
  offset = undefined,
  sort = undefined,
  order = "DESC",
  q = undefined,
  rest = undefined,
  callback
) {
  const result = queryList(sqlSyntaxBasic, limit, offset, sort, order, q, rest);
  db.query(result.sql, result.arrParams, function (err, d) {
    callback(d);
  });
};
exports.readByLoai = function (
  id,
  limit = undefined,
  offset = undefined,
  sort = undefined,
  order = "DESC",
  rest = undefined,
  callback
) {
  let sql = sqlSyntaxBasic + " WHERE p.idLoai = ? ";
  const result = queryList(sql, limit, offset, sort, order, rest);
  db.query(result.sql, [+id, ...result.arrParams], (err, d) => {
    if (d.length < 1) data = { thongbao: `IdLoai ${id} khong tim thay` };
    callback(d);
  });
};
exports.create = function (data, callback) {
  let sql = "INSERT INTO sanpham SET ?";
  db.query(sql, data, function (err, d) {
    callback(d);
  });
};
exports.update = function (id, data, callback) {
  let sql = "UPDATE sanpham  SET ? WHERE id = ?";
  db.query(sql, [data, id], (err, d) => {
    if (err) throw err;
    callback();
  });
};

exports.read = function (id, callback) {
  let sql = sqlSyntaxBasic + ` WHERE p.id = ?`;
  db.query(sql, id, (err, d) => {
    if (d.length < 1) data = { thongbao: `Id ${id} khong tim thay` };
    else {
      data = d[0];
    }
    callback(data);
  });
};

exports.delete = function (id, callback) {
  let sql = "DELETE FROM sanpham WHERE id = ?";
  db.query(sql, id, (err, d) => {
    if (err) throw err;
    callback();
  });
};
