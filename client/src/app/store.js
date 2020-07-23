import { createStore, applyMiddleware, compose } from "redux";
import allReducers from "./reducers/index";
import thunk from "redux-thunk";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
  allReducers,
  composeEnhancer(applyMiddleware(thunk))
);
