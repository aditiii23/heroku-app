const express = require("express");
const bodyParser = require("body-parser");
const bcrpyt = require("bcrypt-nodejs");
const cors = require('cors');
const bcrypt = require('bcryptjs');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image =  require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
   // host : 'ziggy.db.elephantsql.com',
    //user : 'rohjehap',
    //password : 'v0LyXcQC1LDTomafF83zmUGbzETJ_sNv',
    //database : 'rohjehap'
    connectionString : process.env.DATABASE_URL,
    ssl:true,
  }
});

const app = express();


app.use(bodyParser.json());
app.use(cors())

app.get("/", (req, res) => {
  res.send({users : database.users})
});

app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt)})

app.post("/register", (req, res) => { register.handleRegister(req, res, db, bcrypt)})

app.get("/profile/:id", (req, res) => { profile.handleProfileGet(req, res, db)})

app.put("/image", (req, res) => { image.handleImage(req, res, db)})

app.post("/imageUrl", (req, res) => { image.handleApiCall(req, res)})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("app is running on port ", PORT);
});
