require("dotenv");
const express = require('express');
const cookieParser = require('cookie-parser')
const path = require("path");
const db = require('./models')
const router = require('./routes')
const app = express();

db.sequelize.sync({ force: false }).then(() => {
  console.log("Drop and re-sync db.");
});

app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SIGN));

// Middleware CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  next();
});

app.use("/images", express.static(path.join(__dirname, "images")));

app.use(router)

module.exports = app;
