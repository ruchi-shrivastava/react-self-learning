const userModel = require("../models/user.model");

module.exports = {
  loginUser: async body => {
    const user = await userModel.findById(req.user._id).select("-password");
    res.send(user);
  }
};
