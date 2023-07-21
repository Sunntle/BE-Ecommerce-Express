var db = require("./database");
const { login } = require("./user");
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
      let queryParams = key.split("_");
      let condition;
      let queryHaveManyParams;
      if (queryParams[1] == "lte") condition = "<=";
      else if (queryParams[1] == "gte") condition = ">=";
      else {
        if (queryParams.length <= 2) condition = "LIKE";
        else {
          condition = "LIKE";
        }
      }
      if (whereExists) {
        sql += ` AND `;
      } else {
        sql += ` WHERE `;
        whereExists = true;
      }
      const syntax = queryParams.length > 2 ? queryParams[0] + "_" + queryParams[1] : queryParams[0];
      sql += condition === "LIKE" ? `${syntax} ${condition} "${value}"` : `${syntax} ${condition} ${value} `;
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
  if (arrParams.length > 0)
    return {
      sql: sql,
      arrParams: arrParams,
    };
  else {
    return {
      sql: sql,
      arrParams: null,
    };
  }
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
  const result = queryList(`SELECT * FROM order_details as p`, limit, offset, sort, order, q, rest);
  db.query(result.sql, result.arrParams, function (err, d) {
    callback(d);
  });
};
exports.readOneOrderDetails = function (id, callback) {
  let sql = "SELECT * FROM order_details WHERE id=? ";
  db.query(sql, id, (err, d) => {
    if (d.length < 1) data = { thongbao: `Id ${id} khong tim thay` };
    callback(d);
  });
};
exports.readOneOrderItems = function (id, callback) {
  let sql = "SELECT * FROM order_items WHERE order_id=?";
  db.query(sql, +id, (err, d) => {
    // if (d.length < 1) data = { thongbao: `Id ${id} khong tim thay` };
    callback(d);
  });
};
exports.create = function (data, callback) {
  let sql = "INSERT INTO order_details SET ?";
  db.query(sql, data, function (err, d) {
    callback(d);
  });
};
exports.createOrderItems = function (data, callback) {
  let sql = "INSERT INTO order_items (order_id, product_id, quantity, size, color) VALUES ?";
  const values = data.map((el) => [el.order_id, el.product_id, el.quantity, el.size ?? null, el.color ?? null]);
  db.query(sql, [values], function (err, d) {
    callback(d);
  });
};

exports.updateStatus = function (id, data, callback) {
  let sql = "UPDATE order_details  SET ? WHERE id = ?";
  db.query(sql, [data, id], (err, d) => {
    if (err) throw err;
    callback();
  });
};

exports.delete = function (id, callback) {
  let sql = "DELETE FROM order_details WHERE id = ?";
  db.query(sql, id, (err, d) => {
    if (err) throw err;
    callback();
  });
};
