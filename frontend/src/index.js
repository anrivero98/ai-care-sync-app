import React from "react";
import ReactDOM from "react-dom";
import { Router, Routes } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createHashHistory } from "history";

const history = createHashHistory();


ReactDOM.render(
  <React.StrictMode>
    <Router history={history}>
      {/* <App /> */}
      <TestApp />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);


function TestApp() {

  return (
    <div className="App">
      <h1>Hello!</h1>
      </div>
  )
}
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
