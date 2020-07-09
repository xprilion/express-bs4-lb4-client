var express = require('express');
var router = express.Router();
var helpers = require("../helpers");
var axios = require("axios");

router.post('/', function(req, res, next) {
  if (helpers.jwt(req.session.token)) {
    axios
      .post(req.app.locals.api + "/products", 
      {
        name: req.body.name,
        image: req.body.name,
        description: req.body.name,
        price: req.body.name,
        stock: req.body.name,
        categories: req.body.categories
      },
      {
        headers: { "Authorization": "Bearer "+req.session.token },
      })
      .then((response) => {
        console.log(response);
      });
    res.redirect("/products");
  } else {
    res.redirect("/logout");
  }
});

module.exports = router;
