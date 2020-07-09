var express = require('express');
var router = express.Router();
var helpers = require("../helpers");
var axios = require("axios");

router.post('/', function(req, res, next) {
  if (helpers.jwt(req.session.token)) {
    axios
      .post(req.app.locals.api + "/categories", 
      {
        name: req.body.name,
        status: req.body.status
      },
      {
        headers: { "Authorization": "Bearer "+req.session.token },
      })
      .then((response) => {
        console.log(response);
      });
    res.redirect("/categories");
  } else {
    res.redirect("/logout");
  }
});

module.exports = router;