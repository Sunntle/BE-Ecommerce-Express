var express = require("express");
var router = express.Router();
var modelSanPham = require("../controller/product");

router.get("/", function (req, res, next) {
  const { _page, _limit, _sort, _order, q, ...rest } = req.query;
  try {
    modelSanPham.list(_limit, _page, _sort, _order, q, rest, (data) => {res.json(data)});
  } catch (err) {
    console.log(err);
    throw new Error(err)
  }
});
router.get("/idLoai/:id", (req, res) => {
  let id = req.params.id;
  const { _limit, _page, _sort, _order, ...rest } = req.query;
  modelSanPham.readByLoai(id, _limit, _page, _sort, _order, rest, function (u) {
    res.json(u);
  });
});
router.post("/", (req, res) => {
  const data = req.body;
  modelSanPham.create(data, function (d) {
    res.json(d.insertId);
  });
});
router.get("/:id", (req, res) => {
  const id = req.params.id;
  modelSanPham.read(id, function (u) {
    res.json(u);
  });
});

router.put("/:id", (req, res) => {
  const { size, color, id, ...rest } = req.body;
  const idProduct = req.params.id;
  modelSanPham.update(idProduct, rest, function () {
    res.json({ thongbao: "Đã cập nhật user " });
  });
});
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  modelSanPham.delete(id, (d) => {
    res.sendStatus(200);
  });
});
module.exports = router;
