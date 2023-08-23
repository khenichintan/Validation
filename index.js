const express = require("express");
const db = require('./config/mysql');
const port = 8002;

const { validationResult, matchedData } = require('express-validator');
const { body, sanitizeBody } = require('express-validator');
const app = express();
const session = require('express-session');
const flash = require('connect-flash');

const path = require("path");

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'view'));

app.use(express.urlencoded());

app.use(session({
    secret: 'Davinsi',
    saveUninitialized: true,
    resave: true
}));

app.use(flash());

app.use(express.static("assets"));

app.use("/upload", express.static(path.join(__dirname, 'upload')));

app.use('/', require("./router/router"));

app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false;
    }
    db.connect((err) => {
        if (err) {
            console.log("db not connected : ", err);
        } else {
            console.log("db is connected ");
        }
    })
    console.log("server is runing", port);
});