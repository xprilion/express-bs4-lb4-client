const express = require("express");
const router = express.Router();
const categoriesController = require("../controllers/categories");

router.post("/", categoriesController.postCategoriesController);

module.exports = router;
