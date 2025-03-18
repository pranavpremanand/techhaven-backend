const addressModel = require("../models/addressModel");
const userModel = require("../models/userModel");

// Get product using id
exports.getUserDetails = async (data) => {
  console.log("hello");

  const user = await userModel.findById(data);
  if (!user) {
    return { message: "User not found" };
  }

  return user;
};

exports.updateUser = async ({ data, userId }) => {
  const { name, email } = data;

  if (!name && !email) {
    return { message: "Name or email is required for update" };
  }

  // Find and update user details
  const user = await userModel.findById(userId);
  if (!user) {
    return { message: "User not found" };
  }

  if (name) user.name = name;
  if (email) user.email = email;

  await user.save();

  return { message: "Profile updated successfully", user };
};

exports.addUserAddress = async ({ addressData, userId }) => {
  let address = await addressModel.findOne({ userId });

  if (!address) {
    address = new addressModel({
      userId,
      addresses: [addressData],
    });
  } else {
    address.addresses.push(addressData);
  }

  await address.save();
  return { message: "Address added successfully", address };
};

exports.getUserAddress = async (userId) => {
  let address = await addressModel.findOne(userId).select("address");

  if (!address) return { message: "Address not found" };

  return { message: "Address Fetched successfully", address };
};
