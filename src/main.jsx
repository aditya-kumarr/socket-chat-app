import React from "react";
import ReactDOM from "react-dom/client";
import GlobalStateContext from "../contexts/GlobalStateContext";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GlobalStateContext>
      <App />
    </GlobalStateContext>
  </React.StrictMode>
);
