//Connexion a la base de données
const dotenv = require("dotenv")
dotenv.config();

const mysql = require('mysql2');
const express = require('express'); //On appel le framework express
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

let connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

app.post('http://localhost:5000/', (req, res) => {
  const username = req.body.name;
  const password = req.body.password;
  const email = req.body.email;

  connection.query('INSER INTO users (username, password, email) VALUES (?,?,?)',
    [username, password, email],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send("Values Inserted")
      }
    }

  );
})

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
  if (err) throw err;
});