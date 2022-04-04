require("dotenv").config();
const express = require('express');
const path = require('path')
const session = require('express-session')
const mysql2 = require('mysql2/promise');
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const db = require('./models')
const app = express();
const MySQLStore = require('express-mysql-session')(session);


const options = {
  host: process.env.DB_HOST,
  port: 3306,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  createDatabaseTable: true,
  expiration: 86400000
};

var connection = mysql2.createPool(options);
var sessionStore = new MySQLStore({}, connection);


db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});


// Middleware récupèration du body
app.use(express.json());

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


app.use(session({
  secret: process.env.COOKIE_SIGN,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    maxAge: 1 * 24 * 60 * 60 * 1000
  },
  store: sessionStore
}))

app.use(express.static('client/build'));


app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/build/index.html'))
})

module.exports = app;
