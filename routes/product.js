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
// router.get('/', function(req, res, next) {
//     let sql = `SELECT * FROM sanpham`;
//     db.query(sql, function(err, data) {
//         res.render("shop",{allItem:data});
//     });
// });
// router.get('/detail/:id', function(req, res, next) {
//     let id = req.params.id
//     db.query(`SELECT tenLoai FROM loaisanpham`, function(err, loai) {
//         if(err) throw err;
//             db.query(`SELECT * FROM sanpham WHERE id=?`,[id], function(err, item) {
//                 let {solanxem} = item[0]
//                 db.query(`UPDATE sanpham SET solanxem=? WHERE id=?`,[++solanxem,id], function(err, result) {
//                     if(err) throw err;
//                     db.query(`SELECT img FROM images WHERE idSp=?`,[id],function(err, imgs){
//                         res.render("detail",{item:item,categories:loai,imgs: imgs});
//                     })
//                 });
//             });
//     });

// });
// router.get('/addnew', function(req, res, next) {
//     res.send('Form thêm loại sách');
// });
// router.post('/store', function(req, res, next) {
//     //nhận dữ liệu từ addnew để thêm record vào db
// });
// router.get('/edit/:id', function(req, res, next) {
//   var id = req.params.id;
//   res.send('Form chỉnh loại sách' + id);
// });
// router.post('/update', function(req, res, next) {
//     //nhận dữ liệu từ edit để cập nhật vào db
// });
// router.get('/delete/:id', function(req, res) {
//   var id = req.params.id;
//   res.send('Xóa loai');
// });
module.exports = router;
