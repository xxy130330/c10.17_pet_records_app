import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import ReduxPromise from "redux-promise";
import rootReducers from "./reducers";
import App from "./components/app";
import {LOCALAUTH} from './actions';

const store = createStore(rootReducers, {}, applyMiddleware(ReduxPromise));
if(localStorage.auth){
    store.dispatch({type: LOCALAUTH})
}
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);