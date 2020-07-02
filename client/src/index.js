import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
import { FirebaseAppProvider } from "reactfire";

const firebaseConfig = {
  apiKey: "AIzaSyAsf2WuLhTLUH8I1iDn0uqnu9Gjy_si3M8",
  authDomain: "novaa3-comex.firebaseapp.com",
  databaseURL: "https://novaa3-comex.firebaseio.com",
  projectId: "novaa3-comex",
  storageBucket: "novaa3-comex.appspot.com",
  messagingSenderId: "578696710165",
  appId: "1:578696710165:web:38e474f1c58c4a2ac6e61c",
  measurementId: "G-7FWVR15CKY",
};

ReactDOM.render(
  <FirebaseAppProvider firebaseConfig={firebaseConfig}>
    <App />
  </FirebaseAppProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
