var express = require('express');
var router = express.Router();
var modelLoai = require('../controller/loai');
router.get('/',  (req, res) => { 
    modelLoai.list( function(data) { res.json(data)} ); 
});
router.post('/', (req, res) => {
    let data = req.body; 
    modelLoai.create(data , function(){
    res.sendStatus(200);
    });
 });
 router.get('/:id', (req, res) => {
    let id = req.params.id;
    modelLoai.read(id, function(u){
      res.json(u);
    });
 });
 router.put('/:id', (req, res)=> {
      let data = req.body;
      let id = req.params.id;
      modelLoai.update(id, data, function(){
        res.json({thongbao: 'Đã cập nhật user '});
      })
 });
 router.delete('/:id', (req, res)=> {
  let id = req.params.id;
  modelLoai.delete(id, function(u){
    res.json({thongbao: 'Đã xoa '});
  })
});
module.exports = router;