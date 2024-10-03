const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getGameById = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  // FE sends user _id (email or number) as unique id
  const { _id } = await req.params;

  try {
    if (!typeof _id === "string")
      return res
        .status(404)
        .json({ status: 404, message: "Please send a string as ID." });
    await client.connect();
    const db = client.db("Capstone");
    const game = await db.collection("games").findOne({ "game._id": _id });
    if (game) res.status(200).json({ status: 200, game: game });
    else res.status(404).json({ status: 404, message: "Game not found." });
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
};

module.exports = { getGameById };
