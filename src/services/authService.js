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

    if (response?.status === 200) {
      console.log('Login success:', response);
      dispatch(setData(response.data));
      toast('Berhasil Masuk ke Dashboard', {
        toastId: 'toastSuccess',
        className: 'toast-success',
      });
      navigate('/');
    }
  } catch (error) {
    console.error('Login error:', error);
  }
};
