import { configureStore } from "@reduxjs/toolkit";
import unitsReducer from "./unitsSlice.js";
import favoritesReducer from "./favoritesSlice.js";

export default configureStore({
  reducer: {
    units: unitsReducer,
    favorites: favoritesReducer,
  },
});
