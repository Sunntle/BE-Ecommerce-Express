var db=require('./database'); 
exports.list = function( callback) { 
    let sql = `SELECT *  FROM loaisanpham`;
    db.query(sql, function(err, d) { callback(d); }  );
}
exports.create = function(data, callback ) { 
    let sql = 'INSERT INTO loaisanpham SET ?';
    db.query(sql, data, function(err, d) { callback(d) }  );    
} 
exports.update = function(id, data, callback) { 
    let sql = 'UPDATE loaisanpham  SET ? WHERE id = ?';
    db.query(sql, [data, id], (err, d) => {
        if (err) throw err;
        callback();
    });    
} 
exports.read= function(id, callback) {
    let sql = 'SELECT * FROM loaisanpham WHERE id = ?'    
    db.query(sql, id, (err, d) => {
        if(d.length < 1) data = {thongbao:`Id ${id} khong tim thay`}
        else{
            data = d[0]; 
        }
        callback(data);
    });
}
exports.delete = function(id, callback) { 
    let sql1 = 'DELETE FROM sanpham WHERE idLoai = ?'
    let sql = 'DELETE FROM loaisanpham WHERE id = ?';
    db.query(sql1,  id, (err, d) => {
        if (err) throw err;
        db.query(sql, id,(err, d)=>{
            if (err) throw err;
            callback();
        })
    });    
} 