const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getGames = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("Capstone");
    const games = await db.collection("games").find().toArray();
    return res.status(200).json({ status: 200, games: games });
  } catch (error) {
    res.status(404).json({ status: 404, message: error.message });
  } finally {
    await client.close();
  }
};

module.exports = { getGames };
