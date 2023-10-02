import React from "react";
import ReactDOM from "react-dom";
import PhaseOne from "./views/PhaseOne/index";
import PhaseTwo from "./views/PhaseTwo";

ReactDOM.render(
  <React.StrictMode>
    <PhaseOne />
    <br />
    <PhaseTwo />
  </React.StrictMode>,
  document.getElementById("root")
);
