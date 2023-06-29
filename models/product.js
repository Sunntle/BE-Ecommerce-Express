var db=require('./database'); 
exports.list = function( callback) { 
    let sql = `SELECT *  FROM sanpham`;
    db.query(sql, function(err, d) { callback(d); }  );
}
exports.itemBestSeller = function( callback) { 
    let sql = `SELECT * FROM sanpham ORDER BY sold DESC LIMIT 4`;
    db.query(sql, function(err, d) { callback(d); }  );
}
exports.itemNew = function( callback) { 
    let sql = `SELECT * FROM sanpham ORDER BY date DESC LIMIT 4`;
    db.query(sql, function(err, d) { callback(d); }  );
}
exports.create = function(data, callback ) { 
    let sql = 'INSERT INTO sanpham SET ?';
    db.query(sql, data, function(err, d) { callback(d) }  );    
} 
exports.update = function(id, data, callback) { 
    let sql = 'UPDATE sanpham  SET ? WHERE id = ?';
    db.query(sql, [data, id], (err, d) => {
        if (err) throw err;
        callback();
    });    
} 
exports.read= function(id, callback) {
    let sql = 'SELECT * FROM sanpham WHERE id = ?'    
    db.query(sql, id, (err, d) => {
        if(d.length < 1) data = {thongbao:`Id ${id} khong tim thay`}
        else{
            data = d[0]; 
        }
        callback(data);
    });
} 
exports.readByLoai = function(id, callback) {
    let sql = 'SELECT * FROM sanpham WHERE idLoai = ?'    
    db.query(sql, id, (err, d) => {
        if(d.length < 1) data = {thongbao:`IdLoai ${id} khong tim thay`}
        callback(d);
    });
} 
exports.delete = function(id, callback) { 
    let sql = 'DELETE FROM sanpham WHERE id = ?';
    db.query(sql,  id, (err, d) => {
        if (err) throw err;
        callback();
    });    
} 