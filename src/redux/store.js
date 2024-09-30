import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import dataReducer from './reducers/dataReducer';

export default configureStore({
  reducer: {
    auth: authReducer,
    data_report: dataReducer,
  },
  devTools: import.meta.env.VITE_NODE_ENV === 'development',
});
