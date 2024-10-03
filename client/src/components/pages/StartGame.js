import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { mtlHoods } from "../data/mtlHoods";
import { mtlParcs } from "../data/mtlParcs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFutbol } from "@fortawesome/free-regular-svg-icons";
import styled from "styled-components";
import SubmissionForm from "../templates/SubmissionForm";

const StartGame = () => {
  // Form data template to be sent to DB
  const [formData, setFormData] = useState({
    name: "",
    numOfPlayers: "",
    skillLevel: "",
    dateStart: "",
    timeStart: "",
    gameDuration: "",
    contact: "",
    neighbourhood: "",
    parc: "",
    location: "",
  });
  const [parcs, setParcs] = useState([]); // Filtered parcs based on which neighbourhood user selects
  const [fields, setFields] = useState([]); // Filtered fields based on which parc user selects
  const [message, setMessage] = useState(""); // Success or failure message on form submit
  const [loading, setLoading] = useState("waiting for neighbourhood selection"); // Changes depending on previous field selection
  const [isSubmitted, setIsSubmitted] = useState(false); // Set true when form successfully submitted

  // Sets all formData values except for neighbourhood and parc
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Sets the value of neighbourhood and changes the loading status for the user's parc selection
  const handleNeighbourhood = (e) => {
    e.preventDefault();
    if (e) setLoading("waiting for parc selection");
    setFormData({
      ...formData,
      neighbourhood: e.target.value,
    });
  };

  // Sets the value of parc and changes the loading status
  const handleParc = async (e) => {
    e.preventDefault();
    setFormData({ ...formData, parc: e.target.value });
    if (e) setLoading("waiting for field location selection");
  };

  // Sends new formData to server
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setMessage("Processing");
      const response = await fetch("/create-game", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Resets the formData and other useState variables if successful POST
      if (response.status === 201) {
        setMessage("The game has been created successfully - bon match!");
        setIsSubmitted(true);
        setFormData({
          name: "",
          numOfPlayers: "",
          skillLevel: "",
          dateStart: "",
          timeStart: "",
          gameDuration: "",
          contact: "",
          neighbourhood: "",
          parc: "",
          location: "",
        });
        setParcs([]);
        setFields([]);
        setLoading("waiting for neighbourhood selection");
      } else {
        setMessage("Error posting game, please try again.");
      }
    } catch (error) {
      setMessage("Something went wrong - please try again.");
    }
  };

  // First sets all parcs from single neighbourhood and then fetches field coordinates from selected parc index
  useEffect(() => {
    const selectedHood = formData.neighbourhood;
    const parcName = formData.parc;
    const parcsByHood = mtlParcs.find(
      (mtl) => mtl.neighbourhood === selectedHood
    );
    const parcIndex = parcsByHood?.parcs.find((p) => p.name === parcName);

    setParcs(parcsByHood?.parcs);

    const getFieldsByParc = async () => {
      try {
        // The Montreal athletic fields API did not include parc names, thus we search by its index
        await fetch("/fields-by-parc/" + parcIndex?.INDEX_PARC, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok.");
            }
            return response.json();
          })
          .then((data) => setFields(data?.fieldLocations));
      } catch (error) {
        console.log(error.message);
      }
    };
    getFieldsByParc();
  }, [formData.neighbourhood, formData.parc]);

  // Returns a form if the isSubmitted state is false; otherwise, a success message is shown
  return (
    <>
      <NavWrapper>
        <NavLink to="/">Go back</NavLink>
      </NavWrapper>
      <MessageContainer>
        {message && (
          <div>
            {message}
            {message === "Error posting game, please try again." ? (
              <span style={{ color: "red" }}>
                <FontAwesomeIcon
                  style={{ margin: "0 10px" }}
                  icon={faFutbol}
                  size="2xl"
                  bounce
                />
              </span>
            ) : (
              <span style={{ color: "forestgreen" }}>
                <FontAwesomeIcon
                  style={{ margin: "0 10px" }}
                  icon={faFutbol}
                  size="2xl"
                  bounce
                />
              </span>
            )}
          </div>
        )}
      </MessageContainer>
      {!isSubmitted && (
        <FormContainer>
          <div
            style={{
              margin: "5px 0",
              padding: "10px",
              backgroundColor: "blueviolet",
              color: "white",
              borderRadius: "50px",
              fontSize: "20px",
            }}
          >
            To post a game to the board, fill out your info below.
          </div>
          <SubmissionForm
            handleChange={handleChange}
            handleNeighbourhood={handleNeighbourhood}
            handleParc={handleParc}
            handleSubmit={handleSubmit}
            name={formData.name}
            numOfPlayers={formData.numOfPlayers}
            dateStart={formData.dateStart}
            timeStart={formData.timeStart}
            gameDuration={formData.gameDuration}
            contact={formData.contact}
            mtlHoods={mtlHoods}
            parcs={parcs}
            fields={fields}
            loading={loading}
            message={message}
          ></SubmissionForm>
        </FormContainer>
      )}
    </>
  );
};

const MessageContainer = styled.div`
  text-align: center;
  margin: 0 auto;
  color: blueviolet;
  font-size: 24px;
`;

const NavWrapper = styled.div`
  margin: 0 auto 10px;
  max-width: 50%;
  @media (max-width: 768px) {
    max-width: 100%;
  }
  @media (min-width: 769px) and (max-width: 1024px) {
    max-width: 75%;
  }
`;

const FormContainer = styled.div`
  margin: 0 auto;
  border: 2.5px solid blueviolet;
  background-color: #f8f0e3;
  border-radius: 50px;
  padding: 25px;
  text-align: center;
  max-width: 60%;
  @media (max-width: 768px) {
    max-width: 100%;
  }
  @media (min-width: 769px) and (max-width: 1024px) {
    max-width: 75%;
  }
`;

export default StartGame;
