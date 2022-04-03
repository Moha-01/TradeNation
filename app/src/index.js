import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "react-alice-carousel/lib/alice-carousel.css";
import CryptoContext from "./CryptoContext";
import { AuthProvider } from './context/AuthProvider';

// Website Structure
ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <CryptoContext>
        <App />
      </CryptoContext>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
