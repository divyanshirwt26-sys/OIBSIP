
const mongoose = require("mongoose");
require("dotenv").config();

const Pizza = require("./models/Pizza");

const pizzas = [
  {
    name: "Margherita",
    description: "Classic tomato sauce, mozzarella, and fresh basil.",
    price: 249,
    emoji: "🍕",
    tag: "CLASSIC"
  },
  {
    name: "Farmhouse",
    description: "Bell peppers, onions, mushrooms, and mozzarella.",
    price: 349,
    emoji: "🍕",
    tag: "POPULAR"
  },
  {
    name: "Paneer Delight",
    description: "Soft paneer, peppers, onions, and creamy sauce.",
    price: 399,
    emoji: "🍕",
    tag: "SPECIAL"
  },
  {
    name: "Veggie Supreme",
    description: "A generous combination of fresh vegetables.",
    price: 379,
    emoji: "🍕",
    tag: "VEGGIE"
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    for (const pizza of pizzas) {
      await Pizza.updateOne(
        { name: pizza.name },
        { $set: pizza },
        { upsert: true }
      );
    }

    console.log("Pizza menu added successfully!");
  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
