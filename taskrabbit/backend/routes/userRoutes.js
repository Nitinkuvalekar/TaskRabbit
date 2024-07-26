const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
var jwt = require("jsonwebtoken");

// registratin api
router.post("/user", async (req, res) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      res.json({ message: "please enter all the fields" });
    }

    const user = await User.create({ name: username, email: email, password: password });
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});

// login api
router.post("/user_login", async (req, res) => {
  try {
    const { password, username } = req.body;

    if (!password || !username) {
      res.json({ message: "please enter all the fields" });
    }

    const user = await User.find({ name: username }).exec();
    console.log(user);

    if (password === user[0].password) {
      const token = jwt.sign(
        {
          data: {
            email: user[0].email,
            name: user[0].name,
          },
        },
        "jwtsecret",
        { expiresIn: 60 * 60 }
      );

      res.status(200).json({
        message: "user signin successfull",
        token: token,
      });
    } else {
      res.status(404).json({
        message: "please enter correct password",
      });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
