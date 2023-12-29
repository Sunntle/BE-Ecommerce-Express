var userRouter = require("./user");
var loaiRouter = require("./loai");
var productRouter = require("./product");
var sizeRouter = require("./size");
var colorRouter = require("./color");
var checkoutRouter = require("./checkout");
var productSizesRouter = require("./product_sizes");
var productColorRouter = require("./product_colors");
var imagesRouter = require("./images");
const handleConnectDb = require("../middlewares/handleKeepAliveConnection")
const initRoutes = (app) =>{
    app.use("/user",handleConnectDb, userRouter);
    app.use("/loai",handleConnectDb, loaiRouter);
    app.use("/product",handleConnectDb, productRouter);
    app.use("/size",handleConnectDb, sizeRouter);
    app.use("/color",handleConnectDb, colorRouter);
    app.use("/checkout",handleConnectDb, checkoutRouter);
    app.use("/product_colors",handleConnectDb, productColorRouter);
    app.use("/product_sizes",handleConnectDb, productSizesRouter);
    app.use("/images",handleConnectDb, imagesRouter);
    app.use('*', function(req, res){
        const err = new Error(`Route ${req.originalUrl} not found !`);
        res.status(404).json({
            success: false,
            message: err.message
        });
      });
}
module.exports = initRoutes