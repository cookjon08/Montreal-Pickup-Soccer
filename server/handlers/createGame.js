const { v4: uuidv4 } = require("uuid");
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const createGame = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    // Randomly generated id to be used for future identification
    const randomId = uuidv4();

    // FE sends game info of the user
    const gameInfo = req.body;
    const {
      name,
      numOfPlayers,
      skillLevel,
      dateStart,
      timeStart,
      gameDuration,
      contact,
      neighbourhood,
      parc,
      location,
    } = gameInfo;

    // Get the date and time of when the user posted game
    const date = new Date();
    const timePosted = date.getHours() + ":" + date.getMinutes();
    const datePosted =
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();

    // The user info to be posted to the server
    const game = {
      _id: randomId,
      timePosted: timePosted,
      datePosted: datePosted,
      gameInfo: {
        name: name,
        numOfPlayers: numOfPlayers,
        skillLevel: skillLevel,
        dateStart: dateStart,
        timeStart: timeStart,
        gameDuration: gameDuration,
        contact: contact,
        neighbourhood: neighbourhood,
        parc: parc,
        location: location,
      },
    };

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
    if (db) console.log("Connected to database!");
    await db.collection("games").insertOne(game);
    await res.status(201).json({
      status: 201,
      message: "Game created successfully!",
      gameId: game._id,
      timePosted: timePosted,
      datePosted: datePosted,
    });
  } catch (error) {
    res.status(404).json({
      status: 404,
      message: error.message,
    });
  } finally {
    await client.close();
  }
};

module.exports = { createGame };
