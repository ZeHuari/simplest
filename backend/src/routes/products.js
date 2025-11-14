const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
	getProducts,
	getProduct,
	createProduct,
	updateProduct,
	deleteProduct,
} = require("../controllers/productsController");

router.use(authMiddleware);

router.get("/", getProducts);
router.get("/:id", getProduct);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
