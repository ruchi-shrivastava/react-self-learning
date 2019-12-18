const userService = require("../services/user.service");
const bcrypt = require("bcrypt");
const { User, validate } = require("../models/user.model");

exports.LoginUser = async (req, res, next) => {
  try {
    let user = User.findOne({ email: req.body.email })
      .exec()
      .then(async result => {
        if (result) {
          console.log("result", result);
          bcrypt.compare(req.body.password, result.password, async function(
            err,
            response
          ) {
            if (response) {
              res.send({
                status: 200,
                message: "User Authenticated",
                token: result.token
              });
            } else {
              res.send({
                status: 500,
                message: "Username or Password is Invalid"
              });
            }
          });
        } else {
          res.send({ status: 500, message: "Username or Password is Invalid" });
        }
      })
      .catch(err => {
        console.log(err);
      });
  } catch (error) {
    res.status(400).send();
  }
};

exports.AddUser = async (req, res, next) => {
  const user = new User(req.body);
  try {
    const token = await user.generateAuthToken();
    res.status(201).send({ user });
  } catch (e) {
    res.status(400).send(e);
  }
};
