var db=require('./database'); 
exports.list = function( callback) { 
    let sql = `SELECT *  FROM slide`;
    db.query(sql, function(err, d) { callback(d); }  );
}
exports.create = function(data, callback ) { 
    let sql = 'INSERT INTO slide SET ?';
    db.query(sql, data, function(err, d) { callback(d) }  );    
} 
exports.update = function(id, data, callback) { 
    let sql = 'UPDATE slide  SET ? WHERE id = ?';
    db.query(sql, [data, id], (err, d) => {
        if (err) throw err;
        callback();
    });    
} 
exports.read= function(id, callback) {
    let sql = 'SELECT * FROM slide WHERE id = ?'    
    db.query(sql, id, (err, d) => {
        if(d.length < 1) data = {thongbao:`Id ${id} khong tim thay`}
        else{
            data = d[0]; 
        }
        callback(data);
    });
} 