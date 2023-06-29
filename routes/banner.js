var express = require('express');
var router = express.Router();
var db = require('../models/database');
var modelSlide = require('../models/slide');
router.get('/',  (req, res) => { 
    modelSlide.list( function(data) { res.json(data)} ); 
});
router.post('/', (req, res) => {
    let data = req.body; 
    modelSlide.create(data , function(){
    res.sendStatus(200);
    });
 });
 router.get('/:id', (req, res) => {
    let id = req.params.id;
    modelSlide.read(id, function(u){
      res.json(u);
    });
 });
 router.put('/:id', (req, res)=> {
      let data = req.body;
      let id = req.params.id;
      modelSlide.update(id, data, function(){
        res.json({thongbao: 'Đã cập nhật user '});
      })
 });
 router.delete('/:id', (req, res)=> {
  let id = req.params.id;
  modelSlide.delete(id, function(u){
    res.json({thongbao: 'Đã xoa '});
  })
});
module.exports = router;