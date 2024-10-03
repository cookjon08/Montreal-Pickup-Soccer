import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Games from "./pages/Games";
import GlobalStyle from "./GlobalStyles";
import Home from "./pages/Home";
import StartGame from "./pages/StartGame";

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/start-game" element={<StartGame />}></Route>
          <Route path="/find-game" element={<Games />}></Route>
          <Route path="*" element={<h1>404: Page Not Found</h1>}></Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
