import { configureStore } from "@reduxjs/toolkit";
import perfumeReducer from "./perfumeSlice.js";

const store = configureStore({
    reducer: {
        cart: perfumeReducer,
    },
});

export default store;
