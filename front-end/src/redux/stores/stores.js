import { configureStore } from "@reduxjs/toolkit";
import rootReducers from "../reducers/rootReducers";
import thunk from "redux-thunk";

const store = configureStore({
	reducer: rootReducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;