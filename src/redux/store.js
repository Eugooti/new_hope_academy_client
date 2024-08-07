import { configureStore } from "@reduxjs/toolkit";
import initialState from './state'
import rootReducer from './Reducers'

const store = configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
});

export default store;
