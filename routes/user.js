var express = require('express');
var router = express.Router();
var db = require('./../models/database');
var modelUsers = require('./../models/user'); 

router.get('/',  (req, res) => { 
  modelUsers.list( function(listusers) { res.json(listusers)} ); 
});
router.post('/', (req, res) => {
    let data = req.body; 
	  modelUsers.create(data , function(){
      res.json({thongbao:"Đã thêm  xong một user mới"})
        // res.sendStatus(200);
    });
 });
 router.get('/:id', (req, res) => {
    let id = req.params.id;
    modelUsers.read(id, function(u){
      res.json(u);
    });
 });
 router.put('/:id', (req, res)=> {
      let data = req.body;
      let id = req.params.id;
      modelUsers.update(id, data, function(){
        res.json({thongbao: 'Đã cập nhật user '});
      })
 });
router.delete('/:id', (req, res)=> {
  let id = req.params.id;
  modelUsers.delete(id,  function(){
    res.json({thongbao: 'Đã xoa user '});
  })
});
 module.exports = router;
