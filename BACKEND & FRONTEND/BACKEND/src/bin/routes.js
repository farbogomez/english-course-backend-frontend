const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(cors());
const { controller } = require("./Controller");

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.post("/usuarios", (req, res) => {
  let user = req.body;
  controller.setUser(user, res);
});

app.post("/login", (req, res) => {
  let log = req.body;
  controller.Login(log, res);
});

app.get("/usuarios", (req, res) => {
  controller.getUsers(res);
});

exports.app = app;
