const express = require("express");
const router = express.Router();

// Require the controller using one of the following lines:

// const productsController = require('../controllers/productsController')
// Or :
const {
  getProductsList,
  getProduct,
  createNewProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productsController");

router.get("/", (req, res) => {
  // If you required the controller using the first line:
  //productsController.getProductsList(req,res);

  getProductsList(req, res);
});

//-----------------------------------------

router.get("/:id", (req, res) => {
  getProduct(req, res);
});
//-----------------------------------------

router.post("/", async (req, res) => {
  createNewProduct(req, res);
});
//-----------------------------------------

router.patch("/:id", async (req, res) => {
  updateProduct(req, res);
});
//-----------------------------------------
router.delete("/:id", (req, res) => {
  deleteProduct(req, res);
});

module.exports = router;
