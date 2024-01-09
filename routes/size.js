var express = require("express");
var router = express.Router();
var modelSize = require("../controller/size");
router.get("/",(req, res) => {
  try {
    modelSize.list(function (data) {
      res.json(data);
    });
  } catch (err) {
    console.log(err);
    throw new Error(err)
  }
});
module.exports = router;
