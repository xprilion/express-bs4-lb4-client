const helpers = require("../helpers");
const axios = require("axios");

/**
 * Controller for GET request to '/' route
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.getRootController = (req, res, next) => {
  if (helpers.jwt(req.session.token)) {
    var products = [];
    var categories = [];

    axios
      .get(req.app.locals.api + "/categories", {
        headers: { Authorization: "Bearer " + req.session.token },
      })
      .then((response) => {
        categories = response.data;

        axios
          .get(req.app.locals.api + "/products", {
            headers: { Authorization: "Bearer " + req.session.token },
          })
          .then((response) => {
            products = response.data;
            res.render("index", {
              title: "View Products",
              loggedin: true,
              admin: req.session.user.role === "admin",
              products: products,
              categories: categories,
            });
          });
      });
  } else {
    res.render("index", { title: "Home", loggedin: false, categories: [] });
  }
};

/**
 * Controller for GET request to '/login' route
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.getLoginController = (req, res, next) => {
  if (!helpers.jwt(req.session.token)) {
    res.render("auth/login", {
      title: "Login",
      api: req.app.locals.api,
      loggedin: false,
    });
  } else {
    res.redirect("/");
  }
};

/**
 * Controller for POST request to '/login' route
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.postLoginController = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  axios
    .post(req.app.locals.api + "/users/login", {
      email: email,
      password: password,
    })
    .then((response) => {
      req.session.token = response.data.token;
      req.session.user = response.data.user;
      req.session.save();
      res.redirect("/");
    });
};

/**
 * Controller for GET request to '/logout' route
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.logoutController = (req, res, next) => {
  req.session.destroy();
  res.redirect("/");
};
