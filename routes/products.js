var express = require('express');
var router = express.Router();
var helpers = require("../helpers");
var axios = require("axios");

router.post('/:id', function(req, res, next) {
  if (helpers.jwt(req.session.token)) {

    var categories = [];

    var products = [];

    axios
      .get(req.app.locals.api + "/categories", {
        headers: { "Authorization": "Bearer "+req.session.token },
      })
      .then((response) => {
        categories = response.data;
      });

    axios
      .get(req.app.locals.api + "/products/"+req.params.id,
      {
        headers: { "Authorization": "Bearer "+req.session.token },
      })
      .then((response) => {
        products = response.data;
      });

    res.render("products/one", {
      title: "View Item",
      loggedin: true,
      admin: req.session.user.role === "admin",
      products: products,
      categories: categories
    });

  } else {
    res.redirect("/logout");
  }
});

module.exports = router;
