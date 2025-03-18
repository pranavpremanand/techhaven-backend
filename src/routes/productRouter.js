const express = require("express");
const {
  addProduct,
  getProduct,
  getOneProduct,
  addReview,
  getReview,
  addtoCart,
  getCarts,
  removeFromWishlist,
  getWishlist,
  addWishlist,
} = require("../controllers/productController");
const protect = require("../middlewares/authMiddleware");

const router = express.Router();

//Wish list section
router.post("/wishlist", protect, addWishlist);
router.get("/wishlist", protect, getWishlist);
router.delete("/wishlistRemove/:id", protect, removeFromWishlist);

//Review section
router.post("/review", protect, addReview);
router.get("/review", protect, getReview);

//Cart section
router.post("/addCart", protect, addtoCart);
router.get("/getCart", protect, getCarts);

//Product section
router.post("/", protect, addProduct);
router.get("/", protect, getProduct);
router.get("/:id", protect, getOneProduct);
module.exports = router;
