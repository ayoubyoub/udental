/* eslint-disable import/first */
// React
import React from "react";
import ReactDOM from "react-dom";
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {routerMiddleware, ConnectedRouter} from "react-router-redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import createHistory from "history/createBrowserHistory";
// Components
import App from "./containers/App";
// Webpack
import "react-toastify/dist/ReactToastify.css";
import "semantic-ui-css/semantic.min.css";
import "react-table/react-table.css";
import "emoji-mart/css/emoji-mart.css";
import "./style/App.css";
require("./resources/manifest.json");
// I18n
import "./translate/i18n.config.js";
// Begin
export const history = createHistory();
const middleware = [
  thunk,
  routerMiddleware(history)
];


const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
