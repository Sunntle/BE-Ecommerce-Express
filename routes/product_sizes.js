var express = require("express");
var router = express.Router();
var modelProductSize = require("../controller/product_sizes");
router.post("/", (req, res) => {
  const size_id = req.body.size_id;
  const product_id = req.body.product_id;
  const values = size_id.map((item) => [product_id, item]);
  modelProductSize.createProductSize(values, (d) => {
    res.sendStatus(200);
  });
});
router.delete("/:id", (req, res) => {
  let id = req.params.id;
  modelProductSize.deleteProductSize(id, (d) => {
    res.sendStatus(200);
  });
});
module.exports = router;
