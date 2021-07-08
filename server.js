"use strict";

const express = require("express");
const server = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require("./config");
const cors = require("cors");
require("dotenv").config();

server.use(bodyParser.json());
server.use(cors());

const Author = require("./api/models/authorModel");
const Book = require("./api/models/bookModel");
const Director = require("./api/models/directorModel");
const Film = require("./api/models/filmModel");
const Topic = require("./api/models/topicModel");
const Quote = require("./api/models/quoteModel");

//Connect to mongoose
//mongoose.connect(config.getDbConnectionString());
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("connected", () => console.log("Connected to DB"));

const router = require("./api/routes");
server.use(router);

const port = process.env.PORT || 3000;
server.listen(port);
console.log("Running on port ", port);
