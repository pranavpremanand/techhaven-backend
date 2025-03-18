const express = require("express");
const { addAddress, getAddress } = require("../controllers/userController");
const protect = require("../middlewares/authMiddleware");

const router = express.Router();


//  user address
router.post("/addAddress", protect, addAddress);
router.get("/", protect, getAddress);

module.exports = router;
