const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).json({ message: "Authorization header is missing or in an invalid format" });
  }

  try {
    token = authHeader.split(" ")[1];
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    console.error("Token verification error:", err);
    res.status(401).json({ message: "User is not authorized" });
  }
});

module.exports = validateToken;
