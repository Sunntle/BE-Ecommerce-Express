var express = require("express");
var router = express.Router();
var db = require("../models/database");
var modelProductColor = require("../models/product_colors");
router.post("/", (req, res) => {
  const color_id = req.body.color_id;
  const product_id = req.body.product_id;
  const values = color_id.map((item) => [product_id, item]);
  modelProductColor.createProductColor(values, (d) => {
    res.sendStatus(200);
  });
});
router.delete("/:id", (req, res) => {
  let id = req.params.id;
  modelProductColor.deleteProductColor(id, (d) => {
    res.sendStatus(200);
  });
});
module.exports = router;
