var express = require("express");
var router = express.Router();
var db = require("../models/database");
var modelSanPham = require("../models/product");
router.get("/", function (req, res, next) {
  const { _page, _limit, _sort, _order, q, ...rest } = req.query;
  modelSanPham.list(_limit, _page, _sort, _order, q, rest, (data) => res.json(data));
});
router.get("/idLoai/:id", (req, res) => {
  let id = req.params.id;
  const { _limit, _page, _sort, _order, ...rest } = req.query;
  modelSanPham.readByLoai(id, _limit, _page, _sort, _order, rest, function (u) {
    res.json(u);
  });
});
router.post("/", (req, res) => {
  let data = req.body;
  modelSanPham.create(data, function () {
    res.sendStatus(200);
  });
});
router.get("/:id", (req, res) => {
  let id = req.params.id;
  modelSanPham.read(id, function (u) {
    res.json(u);
  });
});

router.put("/:id", (req, res) => {
  let data = req.body;
  let id = req.params.id;
  modelSanPham.update(id, data, function () {
    res.json({ thongbao: "Đã cập nhật user " });
  });
});
module.exports = router;
