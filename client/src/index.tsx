import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import GlobalState from "./context/GlobalState";

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(
    <Router>
      <GlobalState>
        <App />
      </GlobalState>
    </Router>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
