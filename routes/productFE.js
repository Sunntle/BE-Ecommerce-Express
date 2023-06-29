var express = require('express');
var router = express.Router();
var db = require('../models/database');
router.get('/:id',  (req, res) => { 
    res.render('detail')
});
module.exports = router;
