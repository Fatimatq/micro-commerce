const express = require("express");
const router = express.Router();
const { userRegister, loginUser, getUser } = require("../Controllers/UserController");
const validateToken = require("../Middleware/tokenValidationMiddleware"); // Import validateToken middleware

router.route("/:id").get(validateToken, getUser); // Use validateToken middleware here
router.route("/").post(userRegister).get(validateToken, getUser);
router.route("/login").post(loginUser);

module.exports = router;
