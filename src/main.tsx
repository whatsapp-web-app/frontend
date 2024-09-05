import React, { Fragment } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
// import { register } from "../serviceWorker.js";
import { Toaster } from "react-hot-toast";
import { NotificationContextProvider } from "./context/notification.context.tsx";
import StoreProvider from "./provider/StoreProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Fragment>
    <StoreProvider>
      <Toaster />
      <App />
    </StoreProvider>
  </Fragment>
);

// register();
