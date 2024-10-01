import axios from 'axios';
import { toast } from 'react-toastify';
import {
  setData,
  setDataToday,
  setLastPage,
  setTopCategories,
  setTotal,
} from '../redux/reducers/dataReducer';

export const getData = async (dispatch) => {
  try {
    toast.loading('Mohon tunggu...', {
      toastId: 'toastWait',
    });
    const response = await axios.get(
      `${import.meta.env.VITE_API}/get-insiden-v2`,
      {
        withCredentials: true,
      },
    );
    if (response.data.message !== 'Unauthenticated.') {
      dispatch(setData(response?.data?.data));
      dispatch(setTotal(response?.data?.total));
      dispatch(setLastPage(response?.data?.last_page));
      toast.dismiss('toastWait');
      console.log('response.data.data', response.data.data);
      toast('Data Berhasil Didapatkan.', {
        toastId: 'toastSuccess',
        className: 'toast-success',
      });
      console.log('response', response.data); // Tampilkan data yang diterima
    } else {
      toast.dismiss('toastWait');
      toast(response.data.message, {
        toastId: 'toastError',
        className: 'toast-error',
      });
    }
  } catch (error) {
    toast.dismiss('toastWait');
    toast('Mohon maaf saat ini sedang ada masalah', {
      toastId: 'toastError',
      className: 'toast-error',
    });
    console.log('error', error);
  }
};
export const getTopCategories = async (dispatch) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API}/get-top-categories`,
      {
        withCredentials: true,
      },
    );
    console.log('response', response);
    if (response.data.message !== 'Unauthenticated.') {
      dispatch(setTopCategories(response?.data?.data));
    } else {
      toast.dismiss('toastWait');
      toast(response.data.message, {
        toastId: 'toastError',
        className: 'toast-error',
      });
    }
  } catch (error) {}
};
export const getDataToday = async (dispatch) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API}/get-insiden-v2-today`,
      {
        withCredentials: true,
      },
    );
    if (response.data.message !== 'Unauthenticated.') {
      dispatch(setDataToday(response?.data?.data));
      // dispatch(setDataToday(response?.data?));
    } else {
      toast.dismiss('toastWait');
      toast(response.data.message, {
        toastId: 'toastError',
        className: 'toast-error',
      });
    }
  } catch (error) {}
};
