import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./App";
import { UserInputProvider } from './contexts/UserInputContext';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserInputProvider>
      <App />
    </UserInputProvider>
  </React.StrictMode>
);
