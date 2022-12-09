import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import styled from "styled-components";
import "./index.css";
import DocumentationView from "./views/DocumentationView";
import WorkoutView from "./views/WorkoutView";
import AddView from "./views/AddView";
import HistoryView from "./views/HistoryView";
import { ContextProvider } from './Context';
import { ErrorBoundary } from 'react-error-boundary'
import { PATHS } from "./constants";

// note to oneself: this is where the bg color is changed, not in index.css
const Container = styled.div`
  background: #000000;
  height: 100vh;
  overflow: auto;
`;

// handle error
const ErrorFallback = ({ error, resetErrorBoundary }) => (
  <div role="alert">
    <p>Something went wrong:</p>
    <pre>{error.message}</pre>
    <button onClick={resetErrorBoundary}>Try again</button>
  </div>
);

const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to={PATHS.HOME} className="menuLinks">Workout</Link>
        </li>
        <li>
          <Link to={PATHS.ADD} className="menuLinks">New workout</Link>
        </li>
        <li>
          <Link to={PATHS.HISTORY} className="menuLinks">History</Link> 
        </li>
        <li>
          <Link to={PATHS.DOCS} className="menuLinks">Documentation</Link>
        </li>
      </ul>
    </nav>
  );
};

const App = () => {
  return (
    <ContextProvider>
      <Container>
        <Router>
          <Nav />
          <Routes>
            <Route path={PATHS.HOME} element={<WorkoutView />} />
            <Route path={PATHS.ADD} element={<AddView />} />
            <Route path={PATHS.HISTORY} element={<HistoryView />} />
            <Route path={PATHS.DOCS} element={<DocumentationView />} />
          </Routes>
        </Router>
      </Container>
    </ContextProvider>
  );
};

// handle error
const Wrapped = () => {
  return <ErrorBoundary FallbackComponent={ErrorFallback} onError={(error, errorInfo) => {
    // Handle error, maybe send it to a logging service
  }}>
    <App />
  </ErrorBoundary>;
}

export default App;
