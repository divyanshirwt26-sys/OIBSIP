
const express = require("express");
const Pizza = require("../models/Pizza");

const router = express.Router();

// Get available pizzas
router.get("/", async (req, res) => {
  try {
    const pizzas = await Pizza.find({ available: true })
      .sort({ name: 1 });

    res.json(pizzas);
  } catch (error) {
    res.status(500).json({
      message: "Failed to load pizzas"
    });
  }
});

module.exports = router;
