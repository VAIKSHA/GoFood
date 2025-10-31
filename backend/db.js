const mongoose = require("mongoose");
require('dotenv').config();

const mongoURI = process.env.MONGODB_URI;
// MongoDB Atlas connection URI

const mongoDB = async () => {
    try {
        // connect to MongoDB with URI
        await mongoose.connect(mongoURI);
        console.log("MongoDB Connected Successfully!");
        const fetched_data = await mongoose.connection.db.collection("fooditems")
        const itemsData = await fetched_data.find({}).toArray()
        const foodCategory = await mongoose.connection.db.collection("foodcategories")
        const categoryData =  await foodCategory.find({}).toArray()

        global.fooditems = itemsData
        global.foodcategories = categoryData
        
        // console.log("Food items fetched and stored in global variable.")
        
    } catch (err) {
        console.error(`Unable to connect to the server: ${err.message}`)
    }
}

module.exports = mongoDB;