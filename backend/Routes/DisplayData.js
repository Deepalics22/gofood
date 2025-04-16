const express = require("express");
const router = express.Router();
router.post('/foodData', async (req, res) => {
  try {
    const foodData = global.food_items;
    const foodcat=global.foodCategory; // Access the global variable
    res.send(foodData,foodcat); // Send the data as a response
  } catch (error) {
    console.error("Error fetching food data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
module.exports=router;