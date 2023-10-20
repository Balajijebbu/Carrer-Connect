var express=require("express");
var bodyParser=require("body-parser");
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/CareerConnect');
var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
    console.log("connection succeeded");
})


var app = express();
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
 

app.post('/resume', function (req, res) {
    var Name = req.body.name;
    var Dob = req.body.dob;
    var Gender = req.body.gender;
    var Email = req.body.email;
    var Phone = req.body.phone;
    var Education = req.body.education;
    var Experience=req.body.experience;
    var Skills=req.body.skills;
    var Language=req.body.language;
    var Work = req.body.work;
    var data = {
        "name":Name,
        "dob": Dob,
        "gender":Gender,
        "email": Email,
        "phone":Phone,
        "education":Education,
        "experience":Experience,
        "skills":Skills,
        "language":Language,
        "work":Work
    }
    db.collection('resume').insertOne(data,function(err, collection){
        if (err) throw err;
        console.log("Record inserted Successfully");      
    });
     return res.redirect('./success.html');
})
app.listen(8000);
console.log("server listening at port 8000");