require("dotenv");
const express = require('express');
const path = require('path')
const cookieParser = require('cookie-parser')
const cors = require('./middleware/cors.middleware')
const db = require('./models')
const router = require('./routes')
const app = express();

db.sequelize.sync({ force: false }).then(() => {
  console.log("Drop and re-sync db.");
});


app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SIGN));
app.use(cors);
app.use("/images", express.static(path.join(__dirname, "images")));
app.use(router)

module.exports = app;
