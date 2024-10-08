import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: null,
  total: null,
  last_page: null,
  data_today: null,
  data_month: null,
  top_categories: null,
  top_area: null,
  summary_call: null,
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
    setDataMonth: (state, action) => {
      state.data_month = action.payload;
    },
    setTotal: (state, action) => {
      state.total = action.payload;
    },
    setLastPage: (state, action) => {
      state.last_page = action.payload;
    },
    setTopCategories: (state, action) => {
      state.top_categories = action.payload;
    },
    setTopArea: (state, action) => {
      state.top_area = action.payload;
    },
    setSummaryCall: (state, action) => {
      state.summary_call = action.payload;
    },
  },
});

export const {
  setData,
  setTotal,
  setLastPage,
  setDataToday,
  setTopCategories,
  setTopArea,
  setDataMonth,
  setSummaryCall,
} = data.actions;
export default data.reducer;
