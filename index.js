const path = require('path');
const express = require('express')
const app = express()
const port = 3000
var bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


var indexRouter = require('./controller/index');


app.set('views', path.join(__dirname, 'view'));
app.set('view engine', 'ejs');
const bcrypt = require("bcrypt");

app.use('/', indexRouter);
var cookieParser = require('cookie-parser');
app.use(cookieParser())






const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://rajondemo:NhV17jjarIbpk2v4@cluster0.s63fi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority/test', {useNewUrlParser: true, useUnifiedTopology: true});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


 