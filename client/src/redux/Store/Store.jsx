import { configureStore } from "@reduxjs/toolkit";
import { AuthSlice } from "../AuthSlice";
import { StudentSlice } from "../StudentSlice";

const Store=configureStore({
    reducer: {
        Auth:AuthSlice.reducer,
        Student:StudentSlice.reducer
    }
})
export default Store