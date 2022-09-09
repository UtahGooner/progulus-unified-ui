import React from "react";
import {Provider} from "react-redux";
import App from "./app/App";
import {default as store} from './app/configureStore'
import {createRoot} from "react-dom/client";

window.localStorage.setItem('debug', '*');
const container = document.getElementById('app');
const root = createRoot(container!);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>
);
