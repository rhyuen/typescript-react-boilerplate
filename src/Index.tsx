import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Sentry from "@sentry/browser";
import RootErrorBoundary from "./RootErrorBoundary";

import App from "./App";

console.log(process.env.sentrydsn);
Sentry.init({ dsn: process.env.sentrydsn });

if (process.env.NODE_ENV === "development") {
  const axe = require("react-axe");
  axe(React, ReactDOM, 1000);
}

ReactDOM.render(
  <React.StrictMode>
    <RootErrorBoundary>
      <App />
    </RootErrorBoundary>
  </React.StrictMode>,
  document.getElementById("app")
);
