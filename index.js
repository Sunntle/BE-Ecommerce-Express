const compression = require('compression')
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
var initRoutes = require("./routes")
var session = require('cookie-session');
var app = express();
var cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 8000;
app.use(bodyParser.json());
app.use(compression())
app.use(
  session({
    secret: "bimat",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors({
  origin: [process.env.CLIENT_URL, process.env.CLIENT_URL_LOCAL],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}));
initRoutes(app)
app.listen(port, (req, res) => {
  console.log(`Connect port: ${port}`);
});
