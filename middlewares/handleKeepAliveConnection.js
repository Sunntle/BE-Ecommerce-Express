const db = require("../models/database")
const handleConnectDb = (req, res, next) =>{
    db.connect((err,connection) =>
    {
        console.log("Da ket noi database !")
        if (err) {
            console.log(err);
            throw new Error(err)
        }
        next()
    });
}
module.exports = handleConnectDb