import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartRedux";
import userReducer from "./userRedux";
import langReducer from "./langRedux";

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        user: userReducer,
        language: langReducer,
    },
});
