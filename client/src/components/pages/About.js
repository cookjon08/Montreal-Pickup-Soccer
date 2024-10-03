import { NavLink, Link } from "react-router-dom";
import styled from "styled-components";

const About = () => {
  return (
    <>
      <NavWrapper>
        <NavLink to="/">Go back</NavLink>
      </NavWrapper>
      <MainContainer>
        <TextBox>
          The premise is simple:{" "}
          <span style={{ fontStyle: "italic" }}>organize the unorganized.</span>{" "}
          <br />
          {<br />}During the warmer seasons, pickup soccer games happen
          throughout Montreal every day, but unless you happen upon one, gear in
          hand, you miss out on the fun {"(or worse, play barefooted)"}.{<br />}{" "}
          <br />
          Now, with this app, you can search for games in advance and ensure
          that when you arrive at the field, there are players ready to ball.{" "}
          {<br />} <br /> If you can't find anything on the{" "}
          {<Link to="/find-game">Gameboard</Link>}, consider{" "}
          {<Link to="/start-game">starting your own.</Link>}
        </TextBox>
        <VideoBox></VideoBox>
      </MainContainer>
    </>
  );
};

const MainContainer = styled.div`
  margin: 0 auto;
  max-width: 50%;
  @media (max-width: 768px) {
    max-width: 100%;
  }
  @media (min-width: 769px) and (max-width: 1024px) {
    max-width: 75%;
  }
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

const TextBox = styled.div`
  background-color: #f8f0e3;
  border: 2.5px solid blueviolet;
  border-radius: 50px;
  padding: 50px;
  text-align: center;
  font-size: 20px;
`;

const VideoBox = styled.div`
  margin: 0 auto;
  max-width: 50%;
  @media (max-width: 768px) {
    max-width: 100%;
  }
  @media (min-width: 769px) and (max-width: 1024px) {
    max-width: 50%;
  }
`;

export default About;
