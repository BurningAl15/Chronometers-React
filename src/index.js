import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ChronometersProvider } from "./components/Context/ChronometersContext";

ReactDOM.render(
  <React.StrictMode>
    <ChronometersProvider>
      <App />
    </ChronometersProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
