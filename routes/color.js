var express = require("express");
var router = express.Router();
var db = require("../models/database");
var modelColor = require("../models/color");
router.get("/", (req, res) => {
  modelColor.list(function (data) {
    res.json(data);
  });
});
module.exports = router;
