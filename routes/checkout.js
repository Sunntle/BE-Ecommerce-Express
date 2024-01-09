var express = require("express");
var moment = require("moment");
var router = express.Router();
var modelCheckOut = require("../controller/checkout");
var modelUser = require("../controller/user");
var modelProduct = require("../controller/product");
const { authenticateUser } = require("../middlewares/authenication");
const db = require("../config/database");
const { error } = require("console");

router.get("/", authenticateUser, (req, res) => {
  const { _page, _limit, _sort, _order, q, ...rest } = req.query;
  modelCheckOut.list(_limit, _page, _sort, _order, q, (id = undefined), rest, (data) => res.json(data));
});

router.get("/:id", authenticateUser, (req, res) => {
  const id = req.params.id;
  modelCheckOut.readOneOrderDetails(id, (d) => {
    modelCheckOut.readOneOrderItems(id, (data) => {
      res.json({ order_details: d, order_items: data });
    });
  });
});
router.get("/user/detail", authenticateUser, (req, res) => {
  const { sub } = req.user;
  const { _page, _limit, _sort, _order, q, ...rest } = req.query;
  modelCheckOut.list(_limit, _page, _sort, _order, q, +sub, rest, async (orders) => {
    res.json(orders);
  });
});
router.get("/order_items/:id", authenticateUser, async (req, res) => {
  const id = req.params.id;
  modelCheckOut.readOneOrderItems(id, async (d) => {
    const arr = [];
    for (const item of d) {
      arr.push({ order: item, products: await modelProductReadPromise(item.product_id) });
    }
    res.json(arr);
  });
});
router.post("/", authenticateUser, async (req, res) => {
  const id = +req.user.sub;
  const { item, total, name, address, payment_id } = req.body;
  const data = {
    user_id: id,
    total: total,
    payment_id: payment_id,
    name: name,
    address: address,
  };
  try {
    if (data.name === undefined && data.address === undefined) {
      const d = await modelUserReadPromise(id);
      data.name = d.name;
      data.address = d.address;
    }
    db.commit(async function(err) {
      if (err) {
        console.error('Error committing transaction:', err);
      } else {
        let flag = false;
        const orderItems = []
        for (const el of item) {
          try {
            await handleDecProduct(el.id, el.quantity);
            orderItems.push({
              product_id: el.id,
              quantity: el.quantity,
              size: el.size,
              color: el.color,
            });
          } catch (error) {
            flag = true
            console.error('Error processing item:', error);
            db.rollback()
            break;
          }
        }
        if(!flag){
          modelCheckOut.create(data, async (result) => {
            const addingIdOrder = orderItems.map(el => ({...el, order_id: result.insertId}))
            await modelCheckOut.createOrderItems(addingIdOrder,(result2)=>{
              res.json(result.insertId)
            });
        });
        }else res.status(200).send({ status: "error", code:"200", message: "Items are not in sufficient quantity" });
      }
    });

  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(200).send({ status: "error", code:"500", message: "Internal server error" });
  }
});
router.post("/create_payment_url", authenticateUser, function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3001");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  let ipAddr =
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;

  var tmnCode = "592FO55M";
  var secretKey = "BSGVKTPPTQYZLNWTIEXGFEXFUBGJBTQS";
  var vnpUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
  var returnUrl = "http://localhost:3001/bill";

  var date = new Date();

  var createDate = moment(date).format("YYYYMMDDHHmmss");
  var orderId = moment(date).format("HHmmss");
  var amount = req.body.amount;
  var bankCode = req.body.bankCode;
  var orderInfo = req.body.orderDescription;
  var orderType = req.body.orderType;
  var order_id = req.body.order_id;
  var locale = req.body.language;
  if (locale === null || locale === "") {
    locale = "vn";
  }
  var currCode = "VND";
  var vnp_Params = {};
  vnp_Params["vnp_Version"] = "2.1.0";
  vnp_Params["vnp_Command"] = "pay";
  vnp_Params["vnp_TmnCode"] = tmnCode;
  // vnp_Params["vnp_Merchant"] = "";
  vnp_Params["vnp_Locale"] = locale;
  vnp_Params["vnp_CurrCode"] = currCode;
  vnp_Params["vnp_TxnRef"] = orderId;
  vnp_Params["vnp_OrderInfo"] = orderInfo;
  vnp_Params["vnp_OrderType"] = orderType;
  vnp_Params["vnp_Amount"] = amount * 100;
  vnp_Params["vnp_ReturnUrl"] = returnUrl;
  vnp_Params["vnp_IpAddr"] = ipAddr;
  vnp_Params["vnp_CreateDate"] = createDate;
  if (bankCode !== null && bankCode !== "") {
    vnp_Params["vnp_BankCode"] = bankCode;
  }
  vnp_Params = sortObject(vnp_Params);

  var querystring = require("qs");
  var signData = querystring.stringify(vnp_Params, { encode: false });
  var crypto = require("crypto");
  var hmac = crypto.createHmac("sha512", secretKey);
  var signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");
  vnp_Params["vnp_SecureHash"] = signed;
  vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: false });
  const data = {
    order_idVnPay: orderId,
    create_DateVnPay: createDate,
  };
  modelCheckOut.updateStatus(order_id, data, (d) => {
    res.json(vnpUrl);
  });
});
router.put("/:id", authenticateUser, async (req, res) => {
  const id = req.params.id;
  const data = {
    status: req.body.status,
  };
  modelCheckOut.updateStatus(id, data, (d) => {
    res.sendStatus(200);
  });
});
router.delete("/order_items/:id", authenticateUser, async (req, res) => {
  const id = req.params.id;
  modelCheckOut.deleteOrderItems(id, (d) => {
    res.sendStatus(200);
  });
});
router.delete("/order_details/:id", authenticateUser, async (req, res) => {
  const id = req.params.id;
  modelCheckOut.deleteOrderItemsByOrderId(id, (d) => {
    modelCheckOut.delete(id, (d) => {
      res.sendStatus(200);
    });
  });
});
function sortObject(obj) {
  let sorted = {};
  let str = [];
  let key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
  }
  return sorted;
}
const modelUserReadPromise = (id) => {
  return new Promise((resolve, reject) => {
    modelUser.read(id, (data) => {
      resolve(data);
    });
  });
};
const modelProductReadPromise = (id) => {
  return new Promise((resolve, reject) => {
    modelProduct.read(id, (data) => {
      resolve(data);
    });
  });
};
const handleDecProduct = (id, quantity) => {
  return new Promise((resolve, reject) => {
    modelProduct.updateCountAndSold(id, quantity, (data) => {
      if(data.changedRows > 0) resolve(data);
      else reject("Product quantity is not enough")
    });
  });
};
module.exports = router;
