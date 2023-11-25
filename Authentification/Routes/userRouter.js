const express = require("express");
const router = express.Router();
const { userRegister, loginUser, getUser, logoutUser } = require("../Controllers/UserController");
const validateToken = require("../Middleware/tokenValidationMiddleware"); 

router.route("/register").post(userRegister);
router.route("/login").post(loginUser);
router.route("/:id").get(validateToken, getUser);
router.post("/logout", logoutUser);

module.exports = router;
