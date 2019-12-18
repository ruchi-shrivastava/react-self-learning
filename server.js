const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userRoute = require('./api/routes/user.route');
const config = require('config')

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (!config.get("myprivatekey")) {
  console.error("FATAL ERROR: myprivatekey is not defined.");
  process.exit(1);
}

app.use('/user', userRoute);     

mongoose.connect("mongodb://localhost:27017/test", {
  useNewUrlParser: true
}).then(() => {
    app.listen(7000);
    console.log("Server Started");
       
}).catch(err => {
    console.log(err);
});


