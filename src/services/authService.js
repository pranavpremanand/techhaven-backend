const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");

exports.userSignup = async (Data) => {
  const existingUser = await userModel.findOne({ email: Data.email });
  let user;
  if (existingUser) {
    throw new Error("User already exists please sign in ");
  } else {
    const hashedPassword = await bcrypt.hash(Data.password, 10);
    Data.password = hashedPassword;

    user = await userModel.create(Data);
  }

  // Generate JWT token
  const token = JWT.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  console.log(token);
  return { user, token };
};

exports.loginUser = async (Data) => {
  try {
    const { email, password } = Data;

    // Check if user exists
    const user = await userModel.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    // Compare entered password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // Generate JWT token
    const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return {
      token,
      user: { id: user._id, name: user.name, email: user.email },
    };
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.changeUserPassword = async ({ data, userId }) => {
  const { oldPassword, newPassword } = data;

  if (!oldPassword || !newPassword) {
    return { message: "Both old and new passwords are required" };
  }

  const user = await userModel.findById(userId);
  if (!user) {
    return { message: "User not found" };
  }

  console.log("User password from DB:", user.password); // Debugging line

  if (!user.password) {
    return { message: "User does not have a password set" };
  }

  // Compare old password with stored hash
  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) {
    return { message: "Old password is incorrect" };
  }

  // Hash and update the new password
  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();

  return { message: "Password changed successfully" };
};
