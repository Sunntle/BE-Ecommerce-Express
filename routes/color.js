var express = require("express");
var router = express.Router();
var modelColor = require("../controller/color");
router.get("/", (req, res) => {
  modelColor.list(function (data) {
    res.json(data);
  });
});
module.exports = router;
