import React from "react";
import ReactDOM from "react-dom/client";
import "./style/css/reseter.css";
import "./style/sass/main.scss";
import Router from "./Router";
import { Provider } from "react-redux";
import store from "./redux/store";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <React.StrictMode>
      <Router />
    </React.StrictMode>
  </Provider>
);
