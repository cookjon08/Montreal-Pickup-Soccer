const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const deleteGame = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const { _id } = req.params;

  try {
    await client.connect();
    const db = client.db("Capstone");
    const deleteById = await db.collection("games").deleteOne({ _id: _id });
    if (!deleteById)
      return res.status(400).json({ status: 400, message: "Game not found." });
    else
      return res
        .status(200)
        .json({ status: 200, message: "Game deleted successfully." });
  } catch (error) {
    res.status(400).json({ status: 400, message: error.message });
    console.log(error);
  } finally {
    await client.close();
  }
};

module.exports = { deleteGame };
