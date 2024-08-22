// const xlsx = require('xlsx');
// const { MongoClient } = require('mongodb');
import xlsx from 'xlsx';
import { MongoClient } from 'mongodb';

// Replace with your MongoDB Atlas connection string
const uri = "mongodb+srv://roshandalami0:meroaahar@cluster0.fnmno.mongodb.net";

async function uploadExcelToMongoDB(filePath) {
  // Read the Excel file
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];

  // Convert the Excel data to JSON
  const jsonData = xlsx.utils.sheet_to_json(sheet);

  // Connect to MongoDB
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    const database = client.db("test"); // replace with your DB name
    const collection = database.collection("foodcompositions"); // replace with your collection name

    // Insert the JSON data into MongoDB
    const result = await collection.insertMany(jsonData);
    console.log(`${result.insertedCount} documents were inserted.`);
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

// Path to your Excel file
const filePath = "../ENGLISH_Food_Composotion_Table_in_English.xlsx";
uploadExcelToMongoDB(filePath);
