import React from "react";
import ReactDOM from "react-dom";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import core from "assets/css/core";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "modules/store";
import * as serviceWorker from "./serviceWorker";
import "./i18n";
import FullStory from "react-fullstory";
import "./css/index.scss";
import theme from "assets/css/theme";
import { Authorization } from "routes";
import Layout from "@theme/Layout/Layout";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import AppContext from "context/AppContext";
import Router from "./Router/Router";
import routes from "./Router";
import "assets/fonts/icons.css";
import { ErrorBoundary } from "./components/ErrorBoundary";
// import AddContent from "components/Modal/AddContent";
const ORG_ID = "XAP7Z";

if (process.env.REACT_APP_ENVIRONMENT !== "development") {
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DSN,
    release: "tops-admin@" + process.env.REACT_APP_VERSION,
    integrations: [
      new Integrations.BrowserTracing(),
      // This will give ability to see correct path in the dev tools
      new Sentry.Integrations.Breadcrumbs({
        console: false
      })
    ],
    tracesSampleRate: 1.0
  });
}

const GlobalStyle = createGlobalStyle`${core}`;

ReactDOM.render(
  <AppContext.Provider
    value={{
      routes
    }}
  >
    <Provider store={store}>
      <BrowserRouter basename={process.env.REACT_APP_BASE_URL}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <FullStory org={ORG_ID} />

          <Authorization>
            <ErrorBoundary>
              <Layout>
                {" "}
                <Router />
                {""}
              </Layout>
            </ErrorBoundary>
          </Authorization>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </AppContext.Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
