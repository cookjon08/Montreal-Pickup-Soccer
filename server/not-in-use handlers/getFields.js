const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getFields = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("Capstone");
    const fields = await db.collection("fields").find().toArray();
    return res.status(200).json({ status: 200, fields: fields });
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
};

module.exports = { getFields };
