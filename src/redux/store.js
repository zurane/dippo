import { configureStore } from "@reduxjs/toolkit";
import currentUserReducer from "../redux/user/userSlice.js";

export const store = configureStore({
  reducer: {
    currentUser: currentUserReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
