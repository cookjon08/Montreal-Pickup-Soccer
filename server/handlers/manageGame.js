const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const manageGame = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  // User sends unique game id to edit certain info
  const { name, players, dateStart, timeStart, contact } = req.body;
  const { _id } = req.params;

  try {
    // Data validation to tell the user on the FE to correct their inputs
    const isContactValid = contact.length === 10;
    const isDateValid = dateStart.length === 10;
    const isTimeValid = timeStart.length === 5;

    if (!isContactValid || !isDateValid || !isTimeValid) {
      return res.status(404).json({
        status: 404,
        message: "Invalid data entry - please try again.",
      });
    } else await client.connect();
    const db = client.db("Capstone");
    const updateGameInfo = await db.collection("games").updateOne(
      { _id: _id },
      {
        $set: {
          "gameInfo.name": name,
          "gameInfo.numOfPlayers": players,
          "gameInfo.dateStart": dateStart,
          "gameInfo.timeStart": timeStart,
          "gameInfo.contact": contact,
        },
      }
    );

    // Check if anything was updated
    if (updateGameInfo.modifiedCount >= 1)
      return res
        .status(201)
        .json({ status: 201, message: "Game info updated successfully." });
    else
      res.status(400).json({ status: 400, message: "Something went wrong." });
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
};

module.exports = { manageGame };
