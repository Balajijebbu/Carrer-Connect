var express=require("express");
var bodyParser=require("body-parser");
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/CareerConnect');
var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
    console.log("connection succeeded");
})

var app=express()
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
 
app.post('/sign_up', function(req,res){
    var Name = req.body.name;
    var Email = req.body.email;
    var Message = req.body.message;
   var data = {
    "name": Name,
    "email": Email,
    "message":Message
};

db.collection('Feedback').insertOne(data,function(err, collection){
        if (err) throw err;
        console.log("Message Uploaded Successfully");      
    });
     return res.redirect('./home.html');
})
app.listen(7000);
console.log("server listening at port 7000");