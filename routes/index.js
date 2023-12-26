var userRouter = require("./user");
var loaiRouter = require("./loai");
var productRouter = require("./product");
var sizeRouter = require("./size");
var colorRouter = require("./color");
var checkoutRouter = require("./checkout");
var productSizesRouter = require("./product_sizes");
var productColorRouter = require("./product_colors");
var imagesRouter = require("./images");

const initRoutes = (app) =>{
    app.use("/user", userRouter);
    app.use("/loai", loaiRouter);
    app.use("/product", productRouter);
    app.use("/size", sizeRouter);
    app.use("/color", colorRouter);
    app.use("/checkout", checkoutRouter);
    app.use("/product_colors", productColorRouter);
    app.use("/product_sizes", productSizesRouter);
    app.use("/images", imagesRouter);
}
module.exports = initRoutes