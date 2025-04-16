const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const jwt= require("jsonwebtoken");

const bcrypt = require("bcryptjs");
const JWT_SECRET = "mynameisbhavikbhagatandiamthebestdeveloperintheworld";

router.post(
  "/createuser",
  [
    body("email").isEmail().withMessage("Enter a valid email"),
    body("name").isLength({ min: 5 }).withMessage("Name should be at least 5 characters"),
    body("password").isLength({ min: 5 }).withMessage("Password should be at least 5 characters"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const salt= await bcrypt.genSalt(10);
    let secPassword= await bcrypt.hash(req.body.password,salt)/*  auth token 1.red-header(algorithmtype,jwt type),purple-payload(data),blue-verify signature(32 bit max)*/

    try {
      await User.create({
        name: req.body.name,
        password: secPassword,
        email: req.body.email,
        location: req.body.location,
      });
      res.json({ success: true });
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  }
);

// Route for logging in a user 
router.post(
  "/loginuser",
  [
    body("email").isEmail().withMessage("Enter a valid email"),
    body("password").isLength({ min: 5 }).withMessage("Password should be at least 5 characters"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let email = req.body.email;
    try {
      let userData = await User.findOne({ email });
      if (!userData) {
        return res.status(400).json({ error: "Please enter valid credentials" });
      }
      const pwdCompare = await bcrypt.compare(req.body.password, userData.password);
      if (!pwdCompare) {
        return res.status(400).json({ error: "Please enter valid credentials" });
      }
      const data={
        user:{
          id:userData.id
        }
      }
      const authToken= jwt.sign(data,JWT_SECRET);
      return res.json({ success: true,authToken:authToken });
    } catch (error) {
      console.error("Error logging in user:", error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  }
);

module.exports = router;
