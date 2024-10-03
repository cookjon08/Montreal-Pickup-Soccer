import styled from "styled-components";

const SubmissionForm = ({
  handleChange,
  handleNeighbourhood,
  handleParc,
  handleSubmit,
  name,
  numOfPlayers,
  dateStart,
  timeStart,
  gameDuration,
  contact,
  mtlHoods,
  parcs,
  fields,
  loading,
  message,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <MainContainer>
        <LeftContainer>
          <StyledLabel>
            Name: <br />
            <StyledInput
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
              required
            />
          </StyledLabel>
          <br />
          <StyledLabel>
            Number of players: <br />
            <StyledInput
              type="text"
              name="numOfPlayers"
              value={numOfPlayers}
              onChange={handleChange}
              required
            />
          </StyledLabel>
          <br />
          <StyledLabel>
            Skill level:
            <br />
            <StyledSelect
              name="skillLevel"
              id="skillLevel"
              onChange={handleChange}
              required
            >
              <option style={{ textAlign: "center" }}>-- Select --</option>
              {["Beginner", "Intermediate", "Advanced"].map((level) => (
                <option
                  style={{ textAlign: "center" }}
                  key={level}
                  value={level}
                >
                  {level}
                </option>
              ))}
            </StyledSelect>
          </StyledLabel>
          <br />
          <StyledLabel>
            Date of game: <br />
            <StyledInput
              type="text"
              name="dateStart"
              placeholder="dd/mm/yyyy"
              value={dateStart}
              onChange={handleChange}
              required
            />
          </StyledLabel>
          <br />
          <StyledLabel>
            Time of game: <br />
            <StyledInput
              type="text"
              name="timeStart"
              placeholder="xx:xx (in military time)"
              value={timeStart}
              onChange={handleChange}
              required
            />
          </StyledLabel>
          <br />
          <StyledLabel>
            Duration of game: <br />
            <StyledInput
              type="text"
              name="gameDuration"
              value={gameDuration}
              onChange={handleChange}
              required
            />
          </StyledLabel>
        </LeftContainer>
        <RightContainer>
          <StyledLabel>
            Phone number: <br />
            <StyledInput
              type="tel"
              name="contact"
              placeholder="only numbers"
              value={contact}
              onChange={handleChange}
              required
            />
          </StyledLabel>
          <br />
          <StyledLabel>Neighbourhood: </StyledLabel>
          <br />
          <StyledSelect
            name="neighbourhood"
            id="neighbourhood"
            onChange={handleNeighbourhood}
            required
          >
            <option style={{ textAlign: "center" }}>-- Select --</option>
            {mtlHoods.map((hood) => (
              <option style={{ textAlign: "center" }} key={hood} value={hood}>
                {hood}
              </option>
            ))}
          </StyledSelect>
          <br />
          <StyledLabel>Parc: </StyledLabel>
          <br />
          {loading === "waiting for neighbourhood selection" && (
            <div style={{ fontStyle: "italic", margin: "10px auto 0" }}>
              Select the neighbourhood first
            </div>
          )}
          {parcs && (
            <StyledSelect name="parc" id="parc" onChange={handleParc} required>
              <option style={{ textAlign: "center" }}>-- Select --</option>
              {parcs.map((parc) => (
                <option
                  style={{ textAlign: "center" }}
                  key={parc.name}
                  value={parc.name}
                >
                  {parc.name}
                </option>
              ))}
            </StyledSelect>
          )}
          <br />
          <StyledLabel>Field location: </StyledLabel>
          <br />
          {loading === "waiting for field location selection" ? (
            <StyledSelect name="location" id="location" onChange={handleChange}>
              <option
                style={{ textAlign: "center" }}
                key={"empty"}
                value={"No coordinates"}
              >
                Latitude, Longitude
              </option>
              {fields.map((field) => {
                const lat = field.geometry.coordinates[1];
                const long = field.geometry.coordinates[0];
                return (
                  <option
                    style={{ textAlign: "center" }}
                    key={field.geometry.coordinates[1]}
                    value={`${lat}, ${long}`}
                  >
                    {lat}, {long}
                  </option>
                );
              })}
            </StyledSelect>
          ) : (
            <div style={{ fontStyle: "italic", margin: "10px auto 0" }}>
              Select the parc first
            </div>
          )}
          <br />
          <>
            {message === "Processing" ? (
              <StyledButton type="submit" disabled>
                Submitting...
              </StyledButton>
            ) : (
              <StyledButton type="submit">Post game</StyledButton>
            )}
          </>
        </RightContainer>
      </MainContainer>
    </form>
  );
};

export default SubmissionForm;

const MainContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  @media (max-width: 768px) {
    flex-flow: column nowrap;
  }
`;

const LeftContainer = styled.div`
  align-self: flex-start;
  @media (max-width: 768px) {
    align-self: center;
  }
`;

const RightContainer = styled.div`
  align-self: flex-end;
  @media (max-width: 768px) {
    align-self: center;
  }
`;

const StyledInput = styled.input`
  margin: 5px 0;
  box-sizing: border-box;
  text-align: center;
`;

const StyledLabel = styled.label`
  color: blueviolet;
  font-weight: bold;
`;

const StyledSelect = styled.select`
  margin: 10px 0;
`;

const StyledButton = styled.button`
  background: blueviolet;
  color: white;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 15px;
`;
