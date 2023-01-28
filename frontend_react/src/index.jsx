import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>  // 开发模式下，useEffect 会调2次
  <App />
  // </React.StrictMode>
);
