const express = require("express");
const router = express.Router();
const productsController = require("../controllers/products");

router.get("/:id", productsController.getProdcutsByIdController);

router.post("/", productsController.postProductsController);

module.exports = router;
