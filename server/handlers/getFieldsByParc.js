const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getFieldsByParc = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  // FE sends which parc the user selected
  const { parc } = await req.params;

  try {
    await client.connect();
    const db = client.db("Capstone");
    const result = await db
      .collection("fields")
      .find({ "properties.INDEX_PARC": parc })
      .toArray();
    const filteredResult = result.filter((field) =>
      field.properties["NOM"].includes("Soccer")
    );
    return res
      .status(200)
      .json({ status: 200, fieldLocations: filteredResult });
  } catch (error) {
    res.status(400).json({ status: 400, message: error.message });
  } finally {
    await client.close();
  }
};

module.exports = { getFieldsByParc };
