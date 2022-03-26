import React from "react";
import ReactDOM from "react-dom";
import Router from "./Router";

import "./index.css";
import { NotificationsProvider } from "@mantine/notifications";

ReactDOM.render(
  <React.StrictMode>
    <NotificationsProvider position="top-right">
      <Router />
    </NotificationsProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
