"use strict";
require("dotenv").config();

const { MongoClient } = require("mongodb");

const fields = require("./data/terrain_sport_ext.json");

const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const batchImport = async () => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    // Connecting to MongoDB
    await client.connect();
    const db = client.db("Capstone");

    // Inserting data to MongoDB
    const insertFields = await db.collection("fields").insertMany(fields);
    return insertFields;

    // Catch and log errors
  } catch (error) {
    console.error("Error importing data:", error);
  } finally {
    // Clossing MongoDB
    await client.close();
    console.log("Disconnected from MongoDB");
  }
};

batchImport();
