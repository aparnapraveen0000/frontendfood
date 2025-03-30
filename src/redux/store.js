import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';  // Import your reducer

const store = configureStore({
  reducer: {
    user: userReducer,  // Register the user slice
  },
});

export default store;
