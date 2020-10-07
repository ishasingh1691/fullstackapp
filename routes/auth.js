const express = require("express");
const router = express.Router();
const User = require("../models/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config/default.json");

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ err: { msg: "Invalid Credentials" } });
    }
    bcrypt.compare(password, user.password, async (err, result) => {
      if (result) {
        const payload = {
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
          },
        };

        var token = await jwt.sign(payload, config.jwtPrivateKey);

        return res.status(200).json({ token, name:user.name, email: user.email, avatar: user.avatar });
      } else {
        return res.status(400).json({ err: { msg: "Password did not match" } });
      }
    });
  } catch (err) {
    res.status(500).json({ err: "Server Error" });
  }
});

module.exports = router;
