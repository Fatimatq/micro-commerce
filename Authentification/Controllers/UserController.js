const User = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const handleError = (res, statusCode, message) => {
  console.error(message);
  return res.status(statusCode).json({ message });
};

const userRegister = async (req, res) => {
  const { email, password, firstName, lastName, phone } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const findUser = await User.findOne({ email });

    if (findUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      phone,
    });

    res.json({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
    });
  } catch (error) {
    handleError(res, 500, "Internal server error");
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    if (await bcrypt.compare(password, user.password)) {
      const accessToken = jwt.sign(
        {
          user: {
            email: user.email,
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
          },
        },
        process.env.JWT_SECRET,
        { expiresIn: "15m" }
      );
      res.status(200).json({ accessToken, userId: user._id });
    } else {
      res.status(401).json({ message: "Wrong email or password" });
    }
  } catch (error) {
    handleError(res, 500, "Internal server error");
  }
};

const getUser = async (req, res) => {
  const userId = req.params.id;
  console.log("UserID:", userId);

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
    });
  } catch (error) {
    console.error("Error in getUser:", error);
    handleError(res, 500, "Internal server error");
  }
};
const logoutUser = async (req, res) => {
  try {
    res.json({ message: "Logout successful" });
  } catch (error) {
    // Handle errors
    handleError(res, 500, "Internal server error");
  }
};

module.exports = { userRegister, loginUser, getUser, logoutUser };
