//loads all settings from .env file to process.env
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const userRouter = require("./routes/userRouter");

const appPort = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use("/users", userRouter);;

app.use(function (req, res, next) {
    res.status(404).send("Not Found")
});

mongoose.connect(process.env.MONGO_CONNECTION,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    function (err) {
        if (err) return console.log(err);
        app.listen(appPort, function () {
            console.log("Listening port " + appPort);
        });
    });