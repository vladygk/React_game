import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App.jsx";

ReactDOM.createRoot(document.querySelector("#root")).render(
  <StrictMode>
    <App/>
  </StrictMode>
);
