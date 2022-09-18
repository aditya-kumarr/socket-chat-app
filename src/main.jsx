import React from "react";
import ReactDOM from "react-dom/client";
import GlobalStateContext from "./contexts/GlobalStateContext";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <GlobalStateContext>
      <App />
    </GlobalStateContext>
  </BrowserRouter>
);
