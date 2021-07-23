require('dotenv').config();

const User = require("../models/user");
const jwt = require('jsonwebtoken');

exports.userRegister = async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const user = new User({ name: name, email: email, password: password });
  try {
    await user.save();
    res.sendStatus(201);
  } catch (err) {
    res.status(404).json({ message: err });
  }
};

exports.loginAuth = async (req, res) => {
  const user = { email: req.body.email, password: req.body.password };

  User.findOne({ email: user.email })
    .then((result) => {
      console.log(result);
      if(result.password !== user.password){
        res.status(401).json({failed:"wrong password"});
        return;
      }
      const payload = {_id: result._id, name: result.name, email: result.email, password: result.password}
      const token = jwt.sign(payload , process.env.ACCESS_TOKEN_SECRET);
      res.status(200).json({failed: "successful", accessToken: token});
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(401);
    });
  
};
