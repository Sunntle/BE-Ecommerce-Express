var db = require("./database");
function queryList(
  sqlQuery,
  limit = undefined,
  offset = undefined,
  sort = undefined,
  order = "DESC",
  q = undefined,
  id = undefined,
  res = undefined
) {
  let sql = sqlQuery;
  let arrParams = [];
  let whereExists = sql.includes("WHERE") ? true : false;
  if (id) {
    sql += ` WHERE user_id=?`;
    arrParams.push(id);
    whereExists = true;
  }
  if (q && !sql.includes("WHERE")) {
    sql = sql + ` WHERE p.name LIKE CONCAT('%', ? , '%')`;
    arrParams.push(q);
    whereExists = true;
  }
  if (res) {
    for (const [key, value] of Object.entries(res)) {
      let queryParams = key.split("_");
      let condition;
      if (queryParams[1] == "lte" || queryParams[2] == "lte") condition = "<=";
      else if (queryParams[1] == "gte" || queryParams[2] == "gte") condition = ">=";
      else {
        condition = "LIKE";
      }
      if (whereExists) {
        sql += ` AND `;
      } else {
        sql += ` WHERE `;
        whereExists = true;
      }
      const syntax = queryParams.length > 2 ? queryParams[0] + "_" + queryParams[1] : queryParams[0];
      if (syntax.includes("create_at")) {
        let newValue;
        let time;
        let number;
        const arrTime = ["day", "month", "year"];
        arrTime.forEach((el) => {
          if (value.includes(el)) {
            time = el;
            number = value.split(el)[0];
          }
        });
        newValue = `DATE_ADD(CURDATE(), INTERVAL ${number} ${time})`;
        sql += condition === "LIKE" ? `${syntax} ${condition} "${newValue}"` : `${syntax} ${condition} ${newValue} `;
      } else {
        sql += condition === "LIKE" ? `${syntax} ${condition} "${value}"` : `${syntax} ${condition} ${value} `;
      }
    }
  }
  sql += ` GROUP BY p.id`;
  if (sort) {
    sql += ` ORDER BY ${sort} ${order}`;
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

  return {
    sql: sql,
    arrParams: arrParams.length > 0 ? arrParams : null,
  };
}
exports.list = function (limit, offset, sort, order = "DESC", q, id, rest, callback) {
  const result = queryList(`SELECT * FROM order_details as p`, limit, offset, sort, order, q, id, rest);
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
    if (d.length < 1) data = { thongbao: `Id ${id} khong tim thay` };
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

exports.deleteOrderItems = function (product_id, callback) {
  let sql = "DELETE FROM order_items WHERE product_id = ?";
  db.query(sql, product_id, (err, d) => {
    if (err) throw err;
    callback();
  });
};
exports.deleteOrderItemsByOrderId = function (order_id, callback) {
  let sql = "DELETE FROM order_items WHERE order_id = ?";
  db.query(sql, order_id, (err, d) => {
    if (err) throw err;
    callback();
  });
};
exports.deleteByUser = function (user_id, callback) {
  let sql = "DELETE FROM order_details WHERE user_id = ?";
  db.query(sql, id, (err, d) => {
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
