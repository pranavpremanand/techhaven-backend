const userService = require("../services/userService");

exports.getUser = async (req, res, next) => {
  try {
    console.log(req.user._id, "hi");
    const userId = req.user._id;
    const user = await userService.getUserDetails(userId);
    console.log(user, "user und");

    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

exports.updateUserDetails = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const data = req.body;
    const user = await userService.updateUser({ data, userId });
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

exports.addAddress = async (req, res, next) => {
  try {
    const addressData = req.body;
    const userId = req.user._id;
    const user = await userService.addUserAddress({ addressData, userId });
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

exports.getAddress = async (req, res, next) => {
  try {
    console.log("adde", req.user.userId);
    const userId = req.user.userId;
    const user = await userService.getUserAddress(userId);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};
