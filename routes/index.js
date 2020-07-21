const express = require("express");
const router = express.Router();
const indexControllers = require("../controllers/index");

router.get("/", indexControllers.getRootController);

router.post("/login", indexControllers.loginController);

router.get("/logout", indexControllers.logoutController);

module.exports = router;
