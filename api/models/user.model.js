const mongoose = require("mongoose");
const config = require("config");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255
  },
  token: {
    type: String,
    required: true
  }
});

userSchema.pre('save', async function(next){
  const user = this
  if(user.isModified('password')){
      user.password = await bcrypt.hash(user.password, 8)
  }
  next()
})


userSchema.methods.generateAuthToken = async function() {
  const user = this;
  const token = jwt.sign({ email: user.email.toString() }, "radhey", {
    expiresIn: "7 days"
  });
  user.token = token
  await user.save();
  return token;
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = {
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(3)
      .max(255)
      .required()
  };

  return Joi.validate(user, schema);
}
exports.User = User;
exports.validate = validateUser;
