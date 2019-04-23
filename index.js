//index.js
var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var methodOverride = require("method-Override");
var app = express();

//DB setting
mongoose.connect(process.env.BOARD_DB, {useNewUrlParser:true});
var db = mongoose.connection;
db.once("open", function(){
  console.log("DB connected");
});
db.on("error", function(err){
  console.log("DB ERROR : ", err);
});

//Other setting
app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));

//route
app.use("/", require("./routes/home"));
app.use("/posts", require("./routes/posts"));

//port setting
var port = 3000;
app.listen(port, function(){
  console.log("server on! http://localhost"+port);
});
