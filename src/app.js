if (process.env.USER) require("dotenv").config();
const express = require("express");
const app = express();

const notFound = require("./errors/notFound")
const errorHandler = require("./errors/errorHandler")


const moviesRouter = require("./movies/movies.router")

app.use(express.json())

app.use("/movies", moviesRouter)

app.use(notFound)

module.exports = app;
