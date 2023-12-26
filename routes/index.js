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
    app.use((req, res, next) => {
        const err = new Error(`Route ${req.originalUrl} not found !`);
        res.status(404)
        next(err)
    }, (err, req, res, next) => {
        const statusCode = res.statusCode === 200 ? 500 : res.statusCode
        return res.status(statusCode).json({
            success: false,
            message: err.message
        })
    })
}
module.exports = initRoutes