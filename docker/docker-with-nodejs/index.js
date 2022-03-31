const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config()

const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT } = require("./configs/config")
const app = express();

const MONGO_URI = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    })
    .then(() => console.log("connected to database"))
    .catch((e) => console.log(e))

const PORT = process.env.PORT || 3000

app.get("/", (req, res) => {
    res.send("<h2>Hello World</h2>")
});

app.listen( PORT, () => {
    console.log("Server is listening on port", PORT)
});