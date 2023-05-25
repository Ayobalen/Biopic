'use strict';
const db = require('./configs/config');
const cors = require("cors")
const express = require('express');
const app = express();
const router = require('./routes/routes')
const bodyParser = require('body-parser');
require('dotenv').config()
const fileUpload = require('express-fileupload');

app.use(fileUpload());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json())

app.use('/', router);


db.authenticate()
  .then(() => console.log("Database connected"))
  .catch(err => console.log('Error: ' + err ));

db.sync();



const port = process.env.PORT;
const Host = '0.0.0.0';


app.listen(port, Host ,(err) => {
  if (err) console.log("Error in Server setup");
  console.log(`listening to http://localhost:${port}`);
});


module.exports = {
  app
};
