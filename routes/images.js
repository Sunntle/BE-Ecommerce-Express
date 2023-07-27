var express = require("express");
var router = express.Router();
var db = require("../models/database");
var modelImages = require("../models/images");
const parser = require("../middlewares/uploader"); // Changed the import to the new file name

router.post("/", parser.array("Image"), (req, res) => {
  const files = req.files; // Use req.file to access the uploaded file
  const id = req.body.product_id;
  const data = files.map((file) => [file.path.replace("/upload/", "/upload/w_600,h_800/"), id]);
  console.log(data);
  modelImages.createImg(data, function (d) {
    res.sendStatus(200);
  });
});

router.delete("/:id", (req, res) => {
  let id = req.params.id;
  modelImages.deleteProductImg(id, (d) => {
    res.sendStatus(200);
  });
});

module.exports = router;
