import styled from "styled-components";
import EditGameForm from "./EditGameForm";
import Map from "./Map";
import { useState } from "react";

const GameCard = ({
  setGames,
  _id,
  datePosted,
  timePosted,
  userName,
  contact,
  players,
  dateStart,
  timeStart,
  gameDuration,
  skillLevel,
  neighbourhood,
  parc,
  location,
}) => {
  // Sets message if game is deleted
  const [deleteMessage, setDeleteMessage] = useState("");
  // Sets true if user clicks on edit game
  const [editGame, setEditGame] = useState(false);
  // Sets true if user clicks on view map
  const [viewMap, setViewMap] = useState(false);

  // DELETE request using the unique game ID
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/delete-game/" + _id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        setDeleteMessage("Game deleted successfully.");
        await fetch("/games")
          .then((response) => response.json())
          .then((data) => {
            setGames(data.games);
            setDeleteMessage("");
          });
      } else if (response.status === 400) {
        setDeleteMessage("Error deleting game, please try again.");
      }
    } catch (error) {
      setDeleteMessage("An error occurred, please try again.");
    }
  };

  const toggleMap = (e) => {
    if (e) setViewMap(true);
  };

  const cancelMap = (e) => {
    if (e) setViewMap(false);
  };

  const toggleEdit = (e) => {
    if (e) setEditGame(true);
  };

  const cancelEdit = (e) => {
    if (e) setEditGame(false);
  };

  return (
    <>
      <CardContainer>
        <ButtonContainer>
          {viewMap ? (
            <Map location={location} cancelMap={cancelMap} />
          ) : (
            <StyledButton onClick={toggleMap}>View map</StyledButton>
          )}
          {editGame ? (
            <EditGameForm _id={_id} cancelEdit={cancelEdit}></EditGameForm>
          ) : (
            <StyledButton onClick={toggleEdit}>Edit game</StyledButton>
          )}
          {deleteMessage === "Error deleting game, please try again." ||
            (deleteMessage === "An error occurred, please try again." && (
              <h4>Delete request failed. Please try again.</h4>
            ))}
          {deleteMessage === "Game deleted successfully." ? (
            <h4>Game deleted.</h4>
          ) : (
            <StyledButton onClick={handleDelete}>Delete game</StyledButton>
          )}
        </ButtonContainer>
        <InfoContainer>
          <Info style={{ fontSize: "10px", fontStyle: "italic" }}>
            <Key style={{ fontStyle: "normal" }}>Posted on: </Key> {datePosted}{" "}
            - {timePosted}
          </Info>
          <Title>{neighbourhood}</Title>
          <SubTitle>{parc}</SubTitle>
          <Info>
            <Key>Posted by: </Key>
            {userName}
          </Info>
          <Info>
            <Key>Phone number: </Key>
            {contact[0]}
            {contact[1]}
            {contact[2]}-{contact[3]}
            {contact[4]}
            {contact[5]}-{contact[6]}
            {contact[7]}
            {contact[8]}
            {contact[9]}
          </Info>
          <Info>
            <Key>Number of players: </Key>
            {players}
          </Info>
          <Info>
            <Key>Date of game: </Key>
            {dateStart}
          </Info>
          <Info>
            <Key>Time of game: </Key>
            {timeStart}
          </Info>
          <Info>
            <Key>Duration of game: </Key>
            {gameDuration}
          </Info>
          <Info>
            <Key>Skill level: </Key>
            {skillLevel}
          </Info>
        </InfoContainer>
      </CardContainer>
    </>
  );
};

export default GameCard;

const CardContainer = styled.div`
  border: 2.5px solid blueviolet;
  border-radius: 50px;
  background-color: #f8f0e3;
  padding: 15px;
  position: relative;
  display: flex;
  justify-content: space-evenly;
  gap: 15px;
`;

const InfoContainer = styled.div`
  border: 1.75px solid forestgreen;
  border-radius: 50px;
  padding: 25px;
  align-self: flex-end;
`;

const Title = styled.div`
  border: 2.5px solid black;
  border-radius: 50px;
  margin-bottom: 5px;
  background: blueviolet;
  color: white;
  padding: 10px;
  font-size: 20px;
  text-align: center;
`;

const SubTitle = styled.div`
  border: 2.5px solid black;
  border-radius: 50px;
  margin-bottom: 5px;
  background: forestgreen;
  color: white;
  padding: 10px;
  font-size: 18px;
  text-align: center;
`;

const Key = styled.span`
  color: blueviolet;
`;

const Info = styled.div`
  padding: 5px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-evenly;
`;

const StyledButton = styled.button`
  background: blueviolet;
  border-radius: 15px;
  color: white;
  padding: 15px;
`;
