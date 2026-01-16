import { createSlice } from "@reduxjs/toolkit";

const saved = localStorage.getItem("tempUnit") || "C";

const unitsSlice = createSlice({
  name: "units",
  initialState: { tempUnit: saved },
  reducers: {
    setUnit(state, action) {
      state.tempUnit = action.payload;
      localStorage.setItem("tempUnit", action.payload);
    },
  },
});

export const { setUnit } = unitsSlice.actions;
export default unitsSlice.reducer;
