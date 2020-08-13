const express = require("express");
dotenv = require('dotenv');
const logger = require("morgan");
const cors = require("cors");
const contactRoutes = require('./routes/contactRoutes');

const app = express();
dotenv.config();
app.use(logger('dev'));
app.use(express.json());
app.use(cors());

app.use('/contacts', contactRoutes);

app.use((req, res, next) => {
  res.status(404).send({ message: "Page not found" });
});

module.exports = { app };
