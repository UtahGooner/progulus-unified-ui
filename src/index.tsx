import React from "react";
import {render} from 'react-dom';
import {Provider} from "react-redux";
import {applyMiddleware, compose, createStore} from "redux";
import thunk from 'redux-thunk';
import reducer from './ducks';
import App from "./components/App";
import NavBar from "./components/NavBar";
import {CssBaseline} from "@mui/material";

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
        progulus_state: any,
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, window.progulus_state || {}, composeEnhancers(applyMiddleware(thunk)));

render(
    <Provider store={store}>
        <App/>
    </Provider>, document.getElementById('progulus--app-container')
);
