import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFutbol } from "@fortawesome/free-regular-svg-icons";
import styled from "styled-components";
import GameCard from "../templates/GameCard";

const Games = () => {
  // Sets games from database
  const [games, setGames] = useState(null);
  // Sets different messages for conditional rendering
  const [message, setMessage] = useState("loading");

  // Fetches games from the database
  useEffect(() => {
    const getGames = async () => {
      await fetch("/games")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok.");
          }
          return response.json();
        })
        .then((data) => {
          setGames(data.games);
          // Checks to see if the data is empty and changes status accordingly
          if (data.games.length > 0) {
            setMessage("loaded");
          } else {
            setMessage("empty");
          }
        })
        .catch((error) => console.error("Error fetching games:", error));
    };

    getGames();
  }, []);

  return (
    <>
      {message === "loading" && (
        <>
          <div
            style={{
              textAlign: "center",
              color: "blueviolet",
              fontSize: "24px",
              padding: "50px",
            }}
          >
            Loading Gameboard...
            <span
              style={{
                color: "blueviolet",
                margin: "10px 10px",
              }}
            >
              <FontAwesomeIcon icon={faFutbol} size="2xl" bounce />
            </span>
          </div>
        </>
      )}
      {games && message === "loaded" && (
        <CardsWrapper>
          {games.map((game) => {
            return (
              <div>
                <NavLink to="/">Go back</NavLink>
                <GameCard
                  setGames={setGames}
                  _id={game._id}
                  datePosted={game.datePosted}
                  timePosted={game.timePosted}
                  userName={game.gameInfo.name}
                  contact={game.gameInfo.contact}
                  players={game.gameInfo.numOfPlayers}
                  dateStart={game.gameInfo.dateStart}
                  timeStart={game.gameInfo.timeStart}
                  gameDuration={game.gameInfo.gameDuration}
                  skillLevel={game.gameInfo.skillLevel}
                  neighbourhood={game.gameInfo.neighbourhood}
                  parc={game.gameInfo.parc}
                  location={game.gameInfo.location}
                />
              </div>
            );
          })}
        </CardsWrapper>
      )}
      {(message === "empty" || games?.length === 0) && (
        <div style={{ textAlign: "center" }}>
          <NavLink to="/">Go back</NavLink>
          <p style={{ marginTop: "25px", fontSize: "18px" }}>
            Sorry, there are no active games.{<br />}
            Please check the board again later, or{" "}
            <Link to="/start-game">start your own.</Link>
          </p>
          <span style={{ color: "red" }}>
            <FontAwesomeIcon icon={faFutbol} size="2xl" bounce />
          </span>
        </div>
      )}
    </>
  );
};

const CardsWrapper = styled.div`
  margin: 0 auto;
  max-width: 60%;
  @media (max-width: 768px) {
    max-width: 100%;
  }
  @media (min-width: 769px) and (max-width: 1024px) {
    max-width: 75%;
  }
`;

export default Games;
