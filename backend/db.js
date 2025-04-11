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

    // Fetch data from "food_items" collection
    const fetched_data = mongoose.connection.db.collection("food_items");
    const data = await fetched_data.find({}).toArray();
    
   /* console.log("🍽️ Food Items:", data);*/

  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
  }
};

module.exports = mongoDB;
