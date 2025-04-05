import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
    user: null,
    isAuthenticated: false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        saveUser: (state, action) => {
            state.user = action.payload.user;
            state.isAuthenticated = true;
            Cookies.set("token", action.payload.token, { expires: 7 }); // Store token in cookies for 7 days
        },
        clearUser: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            Cookies.remove("token"); // Remove token from cookies on logout
        },
    },
});

export const { saveUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
