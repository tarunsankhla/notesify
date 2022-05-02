import { BrowserRouter } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { makeServer } from "./server";
import { AuthenticationProvider } from "./context/AuthContext";
import { ModalProvider } from "./context/ModalProvider";
import "./index.css";
import App from "./App";
import { ArchiveProvider } from "./context/ArchiveContext";
import { TrashProvider } from "./context/TrashContext";
import { LabelProvider } from "./context/LabelContext";
makeServer();


const root = ReactDOM.createRoot(document.getElementById('root') as Element);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthenticationProvider>
        <ModalProvider>
          <ArchiveProvider>
            <TrashProvider>
              <LabelProvider>
                <App />
              </LabelProvider>
            </TrashProvider>
          </ArchiveProvider>
        </ModalProvider>
      </AuthenticationProvider>
    </BrowserRouter>
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
