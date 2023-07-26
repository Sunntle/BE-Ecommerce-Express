var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
var logger = require("morgan");
var indexRouter = require("./routes/index");
var userRouter = require("./routes/user");
var loaiRouter = require("./routes/loai");
var productRouter = require("./routes/product");
var sizeRouter = require("./routes/size");
var colorRouter = require("./routes/color");
var checkoutRouter = require("./routes/checkout");
var productSizesRouter = require("./routes/product_sizes");
var productColorRouter = require("./routes/product_colors");
var imagesRouter = require("./routes/images");
var session = require("express-session");
var app = express();
var cors = require("cors");

app.use(bodyParser.json());
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(
  session({
    secret: "bimat",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
  })
);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const corsOptions = {
  origin: "http://localhost:3001",
  credentials: true,
  methods: ["GET,PUT,POST,DELETE"],
};
app.use(cors(corsOptions));
app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/loai", loaiRouter);
app.use("/product", productRouter);
app.use("/size", sizeRouter);
app.use("/color", colorRouter);
app.use("/checkout", checkoutRouter);
app.use("/product_colors", productColorRouter);
app.use("/product_sizes", productSizesRouter);
app.use("/images", imagesRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
