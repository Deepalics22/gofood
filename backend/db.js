const mongoose = require("mongoose");

const mongoURI =
  "mongodb+srv://deepaliyadavcs22:roshni@cluster0.ygw3sjg.mongodb.net/gofoodmern?retryWrites=true&w=majority&appName=Cluster0";

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ Connected to MongoDB successfully");

    // Fetch food_items
    const foodItemsCollection = mongoose.connection.db.collection("food_items");
    const foodItems = await foodItemsCollection.find({}).toArray();

    if (foodItems.length > 0) {
      // Nested fetch: Only get categories if items exist
      const foodCategoryCollection = mongoose.connection.db.collection("foodCategory");
      const foodCategories = await foodCategoryCollection.find({}).toArray();

      // Set globals inside the scope of food_items
      global.food_items = foodItems;
      global.foodCategory = foodCategories;

      console.log("✅ food_items and foodCategory loaded into globals");
    } else {
      console.warn("⚠️ No food items found in the database.");
    }
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
  }
};

module.exports = mongoDB;
