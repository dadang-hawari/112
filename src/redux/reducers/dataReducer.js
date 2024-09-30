import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: null,
  total: null,
  last_page: null,
  data_today: null,
};

const data = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    setDataToday: (state, action) => {
      state.data_today = action.payload;
    },
    setTotal: (state, action) => {
      state.total = action.payload;
    },
    setLastPage: (state, action) => {
      state.last_page = action.payload;
    },
  },
});

export const { setData, setTotal, setLastPage, setDataToday } = data.actions;
export default data.reducer;
