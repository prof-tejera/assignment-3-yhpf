import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import styled from "styled-components";
import "./index.css";
import DocumentationView from "./views/DocumentationView";
import WorkoutView from "./views/WorkoutView";
import AddView from "./views/AddView";
import HistoryView from "./views/HistoryView";
import { ContextProvider } from './Context';

// note to oneself: this is where the bg color is changed, not in index.css
const Container = styled.div`
  background: #000000;
  height: 100vh;
  overflow: auto;
`;

const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/" className="menuLinks">Workout</Link>
        </li>
        <li>
          <Link to="/add" className="menuLinks">New workout</Link>
        </li>
        <li>
          <Link to="/history" className="menuLinks">History</Link> 
        </li>
        <li>
          <Link to="/docs" className="menuLinks">Documentation</Link>
        </li>
      </ul>
    </nav>
  );
};

// Wrap app using react-error-boundary

const App = () => {
  return (
    <ContextProvider>
      <Container>
        <Router>
          <Nav />
          <Routes>
            <Route path="/docs" element={<DocumentationView />} />
            <Route path="/" element={<WorkoutView />} />
            <Route path="/add" element={<AddView />} />
            <Route path="/history" element={<HistoryView />} />
          </Routes>
        </Router>
      </Container>
    </ContextProvider>
  );
};

export default App;
