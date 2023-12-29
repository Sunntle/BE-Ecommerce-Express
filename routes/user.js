var express = require("express");
var router = express.Router();
var db = require("./../models/database");
var modelUsers = require("./../models/user");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const bcrypt = require("bcryptjs");
const { authenticateUser, checkAdminRole } = require("../middlewares/authenication");
const PRIVATE_KEY = fs.readFileSync("private-key.txt");
require("dotenv").config();

router.get("/", authenticateUser, (req, res) => {
  const { _page, _limit, _sort, _order, q, ...rest } = req.query;
  try {
    modelUsers.list(_limit, _page, _sort, _order, q, rest, (data) =>
      res.json(data)
    );
  } catch (err) {
    console.log(err);
    throw new Error(err)
  }
});
router.get("/:id", (req, res) => {
  let id = req.params.id;
  modelUsers.read(id, function (u) {
    res.json(u);
  });
});
router.post("/", (req, res) => {
  const { password, username, email } = req.body;
  modelUsers.login(username, (d) => {
    if (!d.thongbao) {
      return res.status(302).json({ error: "Username already exists" });
    } else {
      modelUsers.readByEmail(email, (u) => {
        if (!u.thongbao) {
          return res.status(409).json({ error: "Email already exists" });
        } else {
          const salt = bcrypt.genSaltSync(10);
          const pass_mahoa = bcrypt.hashSync(password, salt);
          const data = { ...req.body, password: pass_mahoa };
          modelUsers.create(data, function () {
            res.sendStatus(201);
          });
        }
      });
    }
  });
});
router.post("/login", async (req, res) => {
  const un = req.body.username;
  const pw = req.body.password;
  modelUsers.login(un, (d) => {
    const kq = bcrypt.compareSync(pw, d.password);
    if (kq) {
      const { password, ...data } = d;
      const jwtBearerToken = jwt.sign({ role: d.role }, PRIVATE_KEY, {
        algorithm: "RS256",
        expiresIn: "1h",
        subject: d.id.toString(),
      });
      // res.cookie("SESSIONID", jwtBearerToken, { httpOnly: true, secure: false });
      res.status(200).json({ idToken: jwtBearerToken, expiresIn: 60 * 60, data: data });
    } else res.sendStatus(401); // send status 401 Unauthorized
  });
});
router.post("/getUser", authenticateUser, (req, res) => {
  const idToken = req.body.idToken;
  // Xác thực và giải mã idToken
  jwt.verify(idToken, PRIVATE_KEY, (err, decoded) => {
    if (err) {
      res.status(401).json({ error: "Invalid token" });
    } else {
      const userId = decoded.sub;
      modelUsers.read(userId, (d) => {
        res.status(200).json(d);
      });
    }
  });
});
router.post("/forgotpass", function (req, res) {
  let email = req.body.email;
  modelUsers.readByEmail(email, (u) => {
    if (u.length < 1) res.sendStatus(404);
    const { id, username } = u;
    const newPass = (Math.floor(Math.random() * 1000000) + 100).toString();
    const bcrypt = require("bcrypt");
    var salt = bcrypt.genSaltSync(10);
    var pass_mahoa = bcrypt.hashSync(newPass, salt);
    const sql = { password: pass_mahoa };
    modelUsers.update(id, sql, () => {
      //Tiến hành gửi mail, nếu có gì đó bạn có thể xử lý trước khi gửi mail
      var transporter = nodemailer.createTransport({
        // config mail server
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: process.env.EMAIL_USERNAME, //Tài khoản gmail vừa tạo
          pass: process.env.EMAIL_PASSWORD, //Mật khẩu tài khoản gmail vừa tạo
        },
        tls: {
          // do not fail on invalid certs
          rejectUnauthorized: false,
        },
      });
      var content = "";
      content += `
            <div style="padding: 10px; background-color: white;">
                <h4 style="color: #0085ff">Xin chào <b>${username}</b>!</h4>
                <span style="color: black">Đây là mật khẩu mới của bạn <b>${newPass}</b></span>
                Chúc bạn một ngày tốt lành !
            </div>
    `;
      var mainOptions = {
        // thiết lập đối tượng, nội dung gửi mail
        from: "NQH-Test nodemailer",
        to: req.body.email,
        subject: "Cập nhật mật khẩu",
        html: content, //Nội dung html mình đã tạo trên kia :))
      };
      transporter.sendMail(mainOptions, function (err, info) {
        if (err) {
          console.log(err);
          res.sendStatus(404);
        } else {
          console.log("Message sent: " + info.response);
          res.sendStatus(200);
        }
      });
    });
  });
});
router.post("/changePass", authenticateUser, function (req, res) {
  const id = +req.user.sub;
  let op = req.body.password;
  let np = req.body.newpassword;
  modelUsers.read(id, (d) => {
    const kq = bcrypt.compareSync(op, d.password);
    if (kq) {
      const salt = bcrypt.genSaltSync(10);
      var pass_mahoa = bcrypt.hashSync(np, salt);
      const data = { password: pass_mahoa };
      modelUsers.update(id, data, (d) => {
        res.sendStatus(200);
      });
    } else {
      res.sendStatus(404);
    }
  });
});

router.put("/:id", authenticateUser, (req, res) => {
  const data = req.body;
  const idUser = req.params.id;
  modelUsers.update(idUser, data, function () {
    res.sendStatus(200);
  });
});
router.delete("/:id", authenticateUser, checkAdminRole, (req, res) => {
  let user_id = req.params.id;
  modelUsers.delete(user_id, function () {
    res.sendStatus(200);
  });
});
module.exports = router;
