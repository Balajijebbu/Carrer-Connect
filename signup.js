var express = require("express");
var bodyParser = require("body-parser");
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/CareerConnect');
var db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error"));
db.once('open', function (callback) {
    console.log("connection succeeded");
})

var app = express();
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.post('/signup', function (req, res) {
    var Fullname = req.body.fullname;
    var Mail = req.body.mail;
    var Password = req.body.password;
    var Confirmpassword = req.body.confirmpassword;

    var signupData = {
        "fullname": Fullname,
        "mail": Mail,
        "password": Password,
        "confirmpassword": Confirmpassword
    }

    var loginData = {
        "mail": Mail,
        "password": Password
    }

 
    db.collection('signup').insertOne(signupData, function (err, collection) {
        if (err) throw err;
        console.log("Signup Record inserted Successfully");
    });

   
    db.collection('login').insertOne(loginData, function (err, collection) {
        if (err) throw err;
        console.log("Login Record inserted Successfully");
    });

  
    return res.redirect('./home.html');
});

app.post('/login', function (req, res) {
    var Mail = req.body.mail;
    var Password = req.body.password;

    db.collection('signup').findOne({ "mail": Mail, "password": Password }, function (err, user) {
        if (err) throw err;
        if (user) {
            return res.redirect('./jobs.html');
        } else {
            return res.status(400).send("Invalid login credentials.");
        }
    });
});

app.listen(4000, function () {
    console.log("server listening at port 4000");
});
