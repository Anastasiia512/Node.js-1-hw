const express = require("express");
const router = express.Router();

const usersController = require('../controllers/usersController');
const validate = require("../validate/validateAuth");

router.post("/current", validate.authorize, usersController.currentUser);
router.patch(
  "/subscription",
  validate.authorize,
  validate.validateSubscription,
  usersController.updateSubscription
);

module.exports = router;