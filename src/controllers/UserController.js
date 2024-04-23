const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY;
const REFRESH_SECRET_KEY = process.env.REFRESH_SECRET_KEY;

const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, SECRET_KEY, { expiresIn: "15m" });
};

const generateRefreshToken = (userId) => {
  return jwt.sign({ userId }, REFRESH_SECRET_KEY);
};

const userController = {
  register: async (req, res) => {
    try {
      const user = new User(req.body);
      await user.save();
      res.status(201).send(user);
    } catch (error) {
      res.status(400).send(error.message);
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).send("Invalid email or password");
      }

      const accessToken = generateAccessToken(user._id);
      const refreshToken = generateRefreshToken(user._id);
      res.json({ accessToken, refreshToken });
    } catch (error) {
      res.status(400).send(error.message);
    }
  },

  refreshToken: (req, res) => {
    const refreshToken = req.body.token;
    if (!refreshToken) return res.sendStatus(401);
    jwt.verify(refreshToken, REFRESH_SECRET_KEY, (err, user) => {
      if (err) return res.sendStatus(403);
      const accessToken = generateAccessToken(user.userId);
      res.json({ accessToken });
    });
  },

  logout: (req, res) => {
    res.clearCookie("refreshToken");
    res.send("Logged out successfully");
  },

  getUserInfo: async (req, res) => {
    try {
      const user = await User.findById(req.user.userId);
      if (!user) {
        return res.status(404).send("User not found");
      }
      res.json(user);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  updateUserInfo: async (req, res) => {
    try {
      const { name, email, password, profile, phone_number, address } =
        req.body;
      const user = await User.findById(req.user.userId);
      if (!user) {
        return res.status(404).send("User not found");
      }

      if (name) user.name = name;
      if (email) user.email = email;
      if (password) user.password = password;
      if (profile) user.profile = profile;
      if (phone_number) user.phone_number = phone_number;
      if (address) user.address = address;

      await user.save();
      res.json(user);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  deleteUser: async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.user.userId);
      if (!user) {
        return res.status(404).send("User not found");
      }
      res.send("User deleted successfully");
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
};

module.exports = userController;
