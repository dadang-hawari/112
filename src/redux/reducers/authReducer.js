import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: null,
};

const data = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setData } = data.actions;
export default data.reducer;
