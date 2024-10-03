const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getFieldsByHood = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  // FE sends which neighbourhood the user selected
  const { hood } = req.params;

  try {
    await client.connect();
    const db = client.db("Capstone");
    const fields = await db.collection("fields").find().toArray();

    // Neighbourhood to be filtered from fields
    const result = fields.filter(
      (field) =>
        field.properties["ARROND"] === hood &&
        field.properties["NOM"].includes("Soccer")
    );
    if (result.length === 0)
      return res
        .status(404)
        .json({ status: 404, message: "Field filter failed to work." });
    else {
      res.status(200).json({ status: 200, fields: result });
    }
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
};

module.exports = { getFieldsByHood };
