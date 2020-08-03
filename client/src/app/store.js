import { createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import allReducers from "./reducers/index";
import thunk from "redux-thunk";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
  key: "userSpotifyApi",
  storage: storage,
  whitelist: [
    "user",
    "spotifyApi",
    "mySpotPlaylists",
    "selectedUser",
    "accountSettings",
  ],
};

const persReducer = persistReducer(persistConfig, allReducers);
const middleware = applyMiddleware(thunk);

const store = createStore(persReducer, composeEnhancer(middleware));
const persistor = persistStore(store);

export { persistor, store };
