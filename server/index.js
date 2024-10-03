"use strict";

const express = require("express");
const morgan = require("morgan");

// Handlers
const { getFieldsByHood } = require("./handlers/getFieldsByHood");
const { getFieldsByParc } = require("./handlers/getFieldsByParc");
const { createGame } = require("./handlers/createGame");
const { manageGame } = require("./handlers/manageGame");
const { deleteGame } = require("./handlers/deleteGame");
const { getGames } = require("./handlers/getGames");
const { getGameById } = require("./handlers/getGameById");

const PORT = 4000;

express()
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.static("./server/assets"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))

  /////////// REST endpoints:////////////

  // Get fields
  .get("/fields/:hood", getFieldsByHood)

  // Get all fields from one parc
  .get("/fields-by-parc/:parc", getFieldsByParc)

  // Get games
  .get("/games", getGames)
  .get("/game/:_id", getGameById)

  // Post game
  .post("/create-game", createGame)

  // Modify game
  .put("/manage-game/:_id", manageGame)

  // Delete game
  .delete("/delete-game/:_id", deleteGame)

  // 404 for handling undefined routes
  .use("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This isn't the endpoint you're looking for!",
    });
  })

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
