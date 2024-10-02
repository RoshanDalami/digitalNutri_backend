// import xlsx from 'xlsx'
// import { MongoClient } from 'mongodb';
// // Replace with your MongoDB Atlas connection string
// const uri = "mongodb+srv://roshandalami0:meroaahar@cluster0.fnmno.mongodb.net/";

// async function uploadExcelToMongoDB(filePath) {
//   // Read the Excel file
//   const workbook = xlsx.readFile(filePath);
//   const sheetName = workbook.SheetNames[0];
//   const sheet = workbook.Sheets[sheetName];

//   // Convert the Excel data to JSON
//   const jsonData = xlsx.utils.sheet_to_json(sheet);

//   // Connect to MongoDB
//   const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

//   try {
//     await client.connect();
//     const database = client.db("test"); // replace with your DB name
//     const collection = database.collection("foodcompositionnepali"); // replace with your collection name

//     // Insert the JSON data into MongoDB
//     const result = await collection.insertMany(jsonData);
//     console.log(`${result.insertedCount} documents were inserted.`);
//   } catch (err) {
//     console.error(err);
//   } finally {
//     await client.close();
//   }
// }

// // Path to your Excel file
// const filePath = "./nepaliFoodComposition.xlsx";
// uploadExcelToMongoDB(filePath);

import xlsx from "xlsx";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { FoodCompositionNepali } from "./src/models/foodCompositionNepali.mode.js"; // Adjust the path as needed
// Load environment variables
dotenv.config();

// Use MongoDB URI from the .env file
const uri = "mongodb+srv://roshandalami0:meroaahar@cluster0.fnmno.mongodb.net/";

// Function to upload Excel data to MongoDB
async function uploadExcelToMongoDB(filePath) {
  try {
    // Connect to MongoDB via Mongoose
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    // Read the Excel file
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    // Convert the Excel data to JSON
    const jsonData = xlsx.utils.sheet_to_json(sheet);

    if (jsonData.length === 0) {
      console.error("The Excel file is empty or improperly formatted.");
      return;
    }

    // Prepare the data to match your schema fields
    const formattedData = jsonData.map((row) => ({
      foodCommodity: row["foodCommodity"], // Adjust column name based on your Excel file
      energy: row["energy"],
      carbohydrate: row["carbohydrate"],
      protein: row["protein"],
      fat: row["fat"],
      fibre: row["fibre"],
      iron: row["iron"],
      calcium: row["calcium"],
      vitaminC: row["vitamin C"],
    }));

    const dataToInsert = formattedData?.map((item) => {
      return {
        foodCommodity: item.foodCommodity,
        energy:
          typeof item.energy === "string"
            ? parseFloat(item.energy)
            : item.energy,
        carbohydrate:
          typeof item.carbohydrate === "string"
            ? parseFloat(item.carbohydrate)
            : item.carbohydrate,
        protein:
          typeof item.protein === "string"
            ? parseFloat(item.protein)
            : item.protein,
        fat: typeof item.fat === "string" ? parseFloat(item.fat) : item.fat,
        fibre: typeof item.fat === "string" ? parseFloat(item.fat) : item.fibre,
        iron: typeof item.fat === "string" ? parseFloat(item.fat) : item.iron,
        calcium:
          typeof item.fat === "string" ? parseFloat(item.fat) : item.calcium,
        vitaminC:
          typeof item.fat === "string" ? parseFloat(item.fat) : item.vitaminC,
      };
    });

    console.log(dataToInsert);

    // Insert the JSON data into MongoDB using the Mongoose model
    const result = await FoodCompositionNepali.insertMany(dataToInsert);
    console.log(`${result.length} documents were inserted.`);
  } catch (err) {
    console.error("Error occurred:", err);
  } finally {
    // Close the connection
    await mongoose.connection.close();
    console.log("MongoDB connection closed");
  }
}

// Path to your Excel file
const filePath = "./nepaliFoodComposition.xlsx";
uploadExcelToMongoDB(filePath);
