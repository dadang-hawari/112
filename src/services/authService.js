import axios from 'axios';
import { setData } from '../redux/reducers/authReducer';
import { toast } from 'react-toastify';

const checkInputFields = (username, password, dispatch) => {
  if (!username.trim() || !password.trim) {
    return false;
  }
};
export const userLogin = async (
  username,
  password,
  _token,
  ip_address,
  dispatch,
  navigate,
) => {
  try {
    if (checkInputFields(username, password) === false) {
      toast('Mohon Menginputkan Seluruh Field', {
        className: 'toast-error',
        toastId: 'toast-error',
      });
      return;
    }
    toast.loading('Mohon tunggu sebentar...', {
      toastId: 'toastWait',
    });

    const response = await axios.post(
      `${import.meta.env.VITE_API}/login`,
      {
        username,
        password,
        _token,
        ip_address,
      },
      {
        withCredentials: true, // Pastikan credentials disertakan
      },
    );
    console.log('response', response);

    if (response?.data?.msgType === 'success') {
      console.log('Login success:', response);
      toast.dismiss('toastWait');
      dispatch(setData(response.data));
      toast('Berhasil Masuk ke Dashboard', {
        toastId: 'toastSuccess',
        className: 'toast-success',
      });
      navigate('/');
    } else {
      toast.dismiss('toastWait');
      toast(response.data.msg, {
        toastId: 'toastError',
        className: 'toast-error',
      });
    }
  } catch (error) {
    toast.dismiss('toastWait');
    console.error('Login error:', error);
  }
};
