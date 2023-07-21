var express = require("express");
var router = express.Router();
var db = require("../models/database");
var modelSize = require("../models/size");
router.get("/", (req, res) => {
  modelSize.list(function (data) {
    res.json(data);
  });
});
module.exports = router;
