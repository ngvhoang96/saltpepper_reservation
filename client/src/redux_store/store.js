import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/";

const composeEnhancers =
	(typeof window !== "undefined" &&
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
	compose;

//persist
const persistConfig = {
	key: "root",
	storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
	persistedReducer,
	composeEnhancers(applyMiddleware(thunk))
);
const persistor = persistStore(store);

export { store, persistor };
