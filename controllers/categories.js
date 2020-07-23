const helpers = require("../helpers");
const axios = require("axios");

/**
 * Controller for POST request to '/categories'
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.postCategoriesController = (req, res, next) => {
  if (helpers.jwt(req.session.token)) {
    axios
      .post(
        req.app.locals.api + "/categories",
        {
          name: req.body.name,
          status: req.body.status,
        },
        {
          headers: { Authorization: "Bearer " + req.session.token },
        }
      )
      .then((response) => {
        console.log(response);
      });
    res.redirect("/categories");
  } else {
    res.redirect("/logout");
  }
};
