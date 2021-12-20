const express = require("express");
const app = express();
const users = require("../controller/userCtrl");
const category = require("../controller/categoryCtrl");
const countries = require("../controller/countryCtrl");
const roundOneQue = require("../controller/roundOneQueCtrl");
const roundTwoQue = require("../controller/roundTwoQueCtrl");
const roundThirdQue = require("../controller/roundThirdQueCtrl");
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.use('/api/user', users);
  app.use('/api/category', category);
  app.use('/api/country', countries);
  app.use('/api/roundone', roundOneQue);
  app.use('/api/roundtwo', roundTwoQue);
  app.use('/api/roundthird', roundThirdQue);
  //read images
  app.use('/images', express.static('./public/images'));
}