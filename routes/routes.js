const express = require("express");
const app = express();
const db = require("../models");

app.get("/api/login/:pinNumber", (req, res) => {
  db.Employee.findAll({
    where: {
      pinNumber: req.params.pinNumber
    }
  }).then(response => res.json(response));
  console.log("api login route");
  return;
});

app.get("/", (req, res) => {
  res.render("login");
});

app.get("/waiters", (req, res) => {
  res.render("waiters");
});

app.get("/kitchen", (req, res) => {
  res.render("kitchen");
});

app.get("/supplies", (req, res) => {
  res.render("supplies");
});

app.get("/roster", (req, res) => {
  res.render("roster");
});

module.exports = app;
