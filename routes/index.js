var express = require('express');
var router = express.Router();
var db = require('../models/database');
router.get('/',  (req, res) => { 
    res.render('index')
});
router.get('/listItem/:id',  (req, res) => { 
    res.render('listItem')
});
module.exports = router;
