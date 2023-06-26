var express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeController");

router
  .route("/")
  .get(homeController.mainController)
  .post(homeController.postRequest);

module.exports = router;
