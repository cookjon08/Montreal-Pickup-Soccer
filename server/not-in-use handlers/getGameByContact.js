const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getGameByContact = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  // FE sends user contact (email or number) as unique id
  const { contact } = await req.params;

  try {
    if (!typeof contact === "string")
      return res
        .status(404)
        .json({ status: 404, message: "Please send a string." });
    await client.connect();
    const db = client.db("Capstone");
    const game = await db
      .collection("games")
      .findOne({ "game.contact": contact });
    if (game) res.status(200).json({ status: 200, game: game });
    else res.status(404).json({ status: 404, message: "Game not found." });
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
};

module.exports = { getGameByContact };

// if (contact.includes("@"))
//   return res.status(200).json({ status: 200, game: game });
// else contact.length === 9;
// return res.status(200).json({ status: 200, game: game });
