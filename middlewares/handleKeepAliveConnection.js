const db = require("../models/database")
db.on('error', function(err) {
    try{
        console.log('db error', err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST') { 
        console.log("lost connect")
        } else {                                      
        throw err;  
        }
    }catch(err){
        db.connect(()=>{
            console.log("Connected");
        })
    }
});
const handleConnectDb = (req, res, next) =>{
    db.connect((err,connection) =>
    {
        console.log("Da ket noi database !")
        if (err) {
            console.log("Bug in connect db", err);
        }
        next()
    });

}
module.exports = handleConnectDb