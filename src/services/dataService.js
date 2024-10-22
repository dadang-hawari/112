import axios from 'axios';
import { toast } from 'react-toastify';
import {
  setData,
  setDataCountInsiden,
  setDataInsiden,
  setDataMonth,
  setDataToday,
  setLastPage,
  setSummaryCall,
  setSummaryInsiden,
  setTopArea,
  setTopCategories,
  setTotal,
} from '../redux/reducers/dataReducer';

export const getData = async (dispatch) => {
  try {
    toast.loading('Mohon tunggu...', {
      toastId: 'toastWait',
    });
    const response = await axios.get(`${import.meta.env.VITE_API}/insiden-v2`, {
      withCredentials: true,
    });
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
      `${import.meta.env.VITE_API}/top-categories`,
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
export const getTopArea = async (dispatch) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API}/top-area`, {
      withCredentials: true,
    });
    console.log('response', response);
    if (response.data.message !== 'Unauthenticated.') {
      dispatch(setTopArea(response?.data?.data));
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
      `${import.meta.env.VITE_API}/insiden-v2-today`,
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
export const getInsidenCountDistrict = async (dispatch) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API}/insiden-count-district`,
      {
        withCredentials: true,
      },
    );

    if (response.data.message !== 'Unauthenticated.') {
      dispatch(setDataCountInsiden(response?.data));
    } else {
      toast.dismiss('toastWait');
      toast(response.data.message, {
        toastId: 'toastError',
        className: 'toast-error',
      });
    }
  } catch (error) {
    console.log('error', error);
  }
};
export const getSummaryCall = async (dispatch) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API}/summary-call`,
      {
        withCredentials: true,
      },
    );
    if (response.data.message !== 'Unauthenticated.') {
      dispatch(setSummaryCall(response?.data));
      console.log('summary-call', response.data.data);
    } else {
      toast.dismiss('toastWait');
      toast(response.data.message, {
        toastId: 'toastError',
        className: 'toast-error',
      });
    }
  } catch (error) {}
};
export const getSummaryInsiden = async (dispatch) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API}/summary-insiden`,
      {
        withCredentials: true,
      },
    );
    if (response.data.message !== 'Unauthenticated.') {
      dispatch(setSummaryInsiden(response?.data?.data));
    } else {
      toast.dismiss('toastWait');
      toast(response.data.message, {
        toastId: 'toastError',
        className: 'toast-error',
      });
    }
  } catch (error) {}
};
export const getDataInsiden = async (
  dispatch,
  showRow,
  callType,
  status,
  dateStart,
  dateEnd,
  sort,
  page,
) => {
  const toLocaleStringStart = dateStart?.toLocaleString('id-ID');
  const toLocaleStringEnd = dateEnd?.toLocaleString('id-ID');
  console.log('toLocaleStringStart', toLocaleStringEnd);
  try {
    const response = await axios.get(`${import.meta.env.VITE_API}/insiden`, {
      params: {
        call_type: callType, // Kirim data sebagai query parameters
        status,
        perPage: showRow,
        dateStart: toLocaleStringStart,
        dateEnd: toLocaleStringEnd,
        sort,
        page,
      },
      withCredentials: true, // Sertakan opsi ini di konfigurasi yang sama
    });

    if (response.data.message !== 'Unauthenticated.') {
      dispatch(setDataInsiden(response?.data));
      console.log('response.data', response.data);
      dispatch(setLastPage(response?.data?.last_page));
    } else {
      toast.dismiss('toastWait');
      toast(response.data.message, {
        toastId: 'toastError',
        className: 'toast-error',
      });
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export const getDataMonth = async (dispatch) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API}/insiden-v2-month`,
      {
        withCredentials: true,
      },
    );
    if (response.data.message !== 'Unauthenticated.') {
      dispatch(setDataMonth(response?.data));
      // dispatch(setDataToday(response?.data?));
      console.log('mont', response.data.data);
      console.log('mont31', response.data);
    } else {
      toast.dismiss('toastWait');
      toast(response.data.message, {
        toastId: 'toastError',
        className: 'toast-error',
      });
    }
  } catch (error) {}
};
