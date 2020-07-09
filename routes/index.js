var express = require("express");
var router = express.Router();
var helpers = require("../helpers");
var axios = require("axios");

router.get("/", function (req, res, next) {
  if (helpers.jwt(req.session.token)) {
    var products = [];
    var categories = [];

    axios
      .get(req.app.locals.api + "/categories", {
        headers: { "Authorization": "Bearer "+req.session.token },
      })
      .then((response) => {
        categories = response.data;
      });

    axios
      .get(req.app.locals.api + "/products", {
        headers: { "Authorization": "Bearer "+req.session.token },
      })
      .then((response) => {
        products = response.data;
      });

    res.render("index", {
      title: "View Products",
      loggedin: true,
      admin: req.session.user.role === "admin",
      products: products,
      categories: categories
    });
  } else {
    res.render("index", { title: "Home", loggedin: false });
  }
});

router.get("/login", function (req, res, next) {
  if (!helpers.jwt(req.session.token)) {
    res.render("auth/login", { title: "Login", api: req.app.locals.api, loggedin: false, });
  } else {
    res.redirect("/");
  }
});

router.post("/login", function (req, res, next) {
  const email = req.body.email;
  const password = req.body.password;
  axios
    .post(req.app.locals.api + "/users/login",  {
      email: email,
      password: password
    })
    .then((response) => {
      req.session.token = response.data.token;
      req.session.user = response.data.user;
      req.session.save();
      res.redirect("/");
    });
});

router.get("/logout", function (req, res, next) {
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;
