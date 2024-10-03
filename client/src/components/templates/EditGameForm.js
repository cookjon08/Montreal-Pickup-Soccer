import styled from "styled-components";
import { useState } from "react";

const EditGameForm = ({
  _id,
  name,
  players,
  dateStart,
  timeStart,
  contact,
  cancelEdit,
}) => {
  // Select form data to be reset by user input
  const [formData, setFormData] = useState({
    name: "",
    players: "",
    dateStart: "",
    timeStart: "",
    contact: "",
  });
  // Sets different messages for conditional rendering
  const [message, setMessage] = useState("");
  // Sets true if formData is successfully submitted
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handler function to send new formData to server
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/manage-game/" + _id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 201) {
        setMessage("The game has been updated successfully.");
        setIsSubmitted(true);
        setFormData({
          name: "",
          players: "",
          dateStart: "",
          timeStart: "",
          contact: "",
        });
      } else {
        setMessage("Error updating game, please try again.");
      }
    } catch (error) {
      setMessage("Error updating game, please try again.");
    }
  };
  return (
    <form
      style={{
        border: "2.5px blueviolet solid",
        borderRadius: "25px",
        backgroundColor: "white",
        position: "absolute",
        padding: "15px",
        zIndex: "2",
      }}
      onSubmit={handleSubmit}
    >
      <button
        style={{
          marginBottom: "10px",
          color: "white",
          backgroundColor: "red",
        }}
        onClick={cancelEdit}
      >
        X
      </button>
      <br></br>
      <label>
        Name: <br />
        <StyledInput
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Number of players: <br />
        <StyledInput
          type="text"
          name="players"
          value={players}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Date of game: <br />
        <StyledInput
          type="text"
          name="dateStart"
          placeholder="dd/mm/yyyy"
          value={dateStart}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Time of game: <br />
        <StyledInput
          type="text"
          name="timeStart"
          placeholder="xx:xx (in military time)"
          value={timeStart}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Phone number: <br />
        <StyledInput
          type="tel"
          name="contact"
          placeholder="only the numbers"
          value={contact}
          onChange={handleChange}
        />
      </label>
      <br />
      <>
        {!isSubmitted && (
          <button
            style={{
              marginTop: "10px",
              border: "2.5px solid black",
              borderRadius: "15px",
              background: "forestgreen",
              color: "white",
              padding: "10px",
            }}
            type="submit"
          >
            Update
          </button>
        )}
        {isSubmitted ? (
          <>
            <br />
            {message}
          </>
        ) : (
          <>
            <br />
            {message}
          </>
        )}
      </>
    </form>
  );
};

export default EditGameForm;

const StyledInput = styled.input`
  text-align: center;
`;
