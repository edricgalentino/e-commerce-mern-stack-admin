import { createSlice } from "@reduxjs/toolkit";

const langSlice = createSlice({
    name: "language",
    initialState: {
        language: "EN",
    },
    reducers: {
        setLanguage: (state, action) => {
            state.language = action.payload;
        },
    },
});

export const { setLanguage } = langSlice.actions;
export default langSlice.reducer;
