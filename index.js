const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then((x) => {
    console.log(x);

    // return Recipe.create({
    //   title: "Fish and Chips",
    //   level: "Amateur Chef",
    //   ingredients: ["Fish", "Chips"],
    //   cuisine: "English",
    //   dishType: "main_course",
    //   image: "https://images.media-allrecipes.com/images/75131.jpg",
    //   duration: 15,
    //   creator: "Colin",
    //   created: new Date(),
    // });

    return Recipe.insertMany(data);
  })
  .then(() => {
    data.forEach(dish => console.log(dish.title));  //console.log'ing every dish title
    console.log("updating duration...");
    return Recipe.updateOne(   //update duration
      { title: "Rigatoni alla Genovese" },
      { $set: { duration: 100 } },
      { new: true }
    );
  })
  .then(() => {
    console.log("deleting CarrotCake");
    return Recipe.deleteOne({ title: "Carrot Cake" });
  })
  .then(() => {
    console.log("ABOUT TO DISCONNECT");
    mongoose.disconnect();    //close connection after finishing everything
  })
  .catch((error) => {
    console.error("Error updating to the database", error);
  });
