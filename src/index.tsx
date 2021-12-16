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
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

render(
    <Provider store={store}>
        <NavBar/>
    </Provider>, document.getElementById('progulus--nav-header')
);

render(
    <Provider store={store}>
        <App/>
    </Provider>, document.getElementById('progulus--main')
);