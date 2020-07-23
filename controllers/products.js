const helpers = require("../helpers");
const axios = require("axios");

/**
 * Controller for GET request to '/products/:id'
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.getProdcutsByIdController = (req, res, next) => {
  if (helpers.jwt(req.session.token)) {
    var categories = [];

    var products = [];

    axios
      .get(req.app.locals.api + "/categories", {
        headers: { Authorization: "Bearer " + req.session.token },
      })
      .then((response) => {
        categories = response.data;
      });

    axios
      .get(req.app.locals.api + "/products/" + req.params.id, {
        headers: { Authorization: "Bearer " + req.session.token },
      })
      .then((response) => {
        products = response.data;
      });

    res.render("products/one", {
      title: "View Item",
      loggedin: true,
      admin: req.session.user.role === "admin",
      products: products,
      categories: categories,
    });
  } else {
    res.redirect("/logout");
  }
};

/**
 * Controller for POST request to '/products'
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.postProductsController = (req, res, next) => {
  if (helpers.jwt(req.session.token)) {
    var cats = req.body.categories;

    if (req.body.categories.length == 1) {
      cats = [req.body.categories];
    }

    axios
      .post(
        req.app.locals.api + "/products",
        {
          name: req.body.name,
          image: req.body.image,
          description: req.body.description,
          price: parseInt(req.body.price),
          stock: parseInt(req.body.stock),
          categories: { cats },
        },
        {
          headers: { Authorization: "Bearer " + req.session.token },
        }
      )
      .then((response) => {
        console.log(response);
        res.redirect("/");
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    res.redirect("/logout");
  }
};
