import React from "react";
import ReactDOM from "react-dom/client";
import GlobalStateContext from "./contexts/GlobalStateContext";
import App from "./App";
import "./index.css";
import { BrowserRouter, HashRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <HashRouter>
    <GlobalStateContext>
      <App />
    </GlobalStateContext>
  </HashRouter>
);
