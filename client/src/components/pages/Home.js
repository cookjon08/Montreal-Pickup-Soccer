import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFutbol } from "@fortawesome/free-regular-svg-icons";
import styled from "styled-components";

const Home = () => {
  return (
    <MainContainer>
      <h1 style={{ color: "blueviolet" }}>{"Montreal Pickup Soccer"}</h1>
      <span
        style={{
          color: "blueviolet",
          fontSize: "24px",
        }}
      >
        <FontAwesomeIcon icon={faFutbol} size="2xl" bounce />
      </span>
      <br />
      <NavWrapper>
        <NavLink to="/start-game">Start a game</NavLink>
      </NavWrapper>
      <br />
      <NavWrapper>
        <NavLink to="/find-game">Find a game</NavLink>
      </NavWrapper>
      <br />
      <NavWrapper>
        <NavLink to="/about">About the project</NavLink>
      </NavWrapper>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  margin: 0 auto;
  max-width: 50%;
  padding: 100px;
  background-color: #f8f0e3;
  border: 2.5px solid blueviolet;
  border-radius: 50px;
  text-align: center;
  @media (max-width: 768px) {
    max-width: 100%;
  }
  @media (min-width: 769px) and (max-width: 1024px) {
    max-width: 75%;
  }
`;

const NavWrapper = styled.div`
  margin: 10px auto 0;
  font-size: 24px;
`;

export default Home;
