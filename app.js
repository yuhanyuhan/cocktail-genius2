const mongoose = require("mongoose");
const express = require("express");

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require ('./swagger.json')



// TO include passportjs 


const logger = require("morgan");
const bodyParser = require("body-parser");

const index = require("./routes/index");
const cocktailsRouter = require("./routes/cocktailsRouter");


mongoose.connect("mongodb://localhost/cocktails_local");
const db = mongoose.connection;
db.on("error", error => {
  console.error("connection error:", error);
});

const app = express();
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(logger("dev"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", index);
app.use("/cocktails", cocktailsRouter);


module.exports = app;
