import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import ButtonPrimary from './components/ButtonPrimary';
import axios from 'axios';
import Cookies from 'js-cookie';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [status, setStatus] = useState('');
  const [token, setToken] = useState('');
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [usernameFocus, setUsernameFocus] = useState(false);
  const checkInputFields = () => {
    if (!username.trim() || !password.trim) {
      alert('mohon memasukkan seluruh inputan ');
      return false;
    }
  };

  const getData = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API}/report/endpoint/get-insiden-v2`,
        {
          columnFilters: {},
          sort: [
            {
              field: 'created_at',
              type: 'desc',
            },
          ],
          page: 1,
          perPage: 1000,
          datefrom: '21/07/2024 00:00:00',
          dateto: '31/07/2024 23:59:59',
          call_type: 0,
          status: 0,
          district: '',
          category_id: '',
        },
        {
          withCredentials: true,
        },
      );
      console.log('response', response);
    } catch (error) {
      console.log('handledata', error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const _token = import.meta.env.VITE_DOMAIN_TOKEN;
    const ip_address = '';

    try {
      if (checkInputFields() === false) return;
      const response = await axios.post(
        `${import.meta.env.VITE_API}/postLogin`,
        {
          username,
          password,
          _token,
          ip_address,
        },
        {
          withCredentials: true,
        },
      );
      console.log('response', response);
      if (response?.data.msgType !== 'error') {
        console.log('response', response);
        setStatus(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full md:flex h-screen justify-center ">
      <div className="flex w-full max-w-[400px] mx-auto items-center justify-center h-full px-5 ">
        <div className="w-full relative">
          {status ? (
            <form>
              <ButtonPrimary text="Dapatkan Data" click={getData} />
            </form>
          ) : (
            <form>
              <div className="mb-2 relative">
                <label
                  htmlFor="username"
                  className={`text-sm text-gray-500 px-2 pointer-events-none bg-white transition-all absolute z-30 left-2 top-1/2 -translate-y-1/2 ${
                    usernameFocus ? 'top-[3%] text-xs' : 'top-1/2'
                  }`}
                >
                  Masukkan username
                </label>
                <input
                  id="username"
                  type="text"
                  className={`w-full input-primary  outline-none focus:border-blue-500`}
                  value={username}
                  autoComplete="off"
                  onChange={(e) => setUsername(e.target.value)}
                  onFocus={() => setUsernameFocus(true)}
                  onBlur={() =>
                    username.length > 0
                      ? setUsernameFocus(true)
                      : setUsernameFocus(false)
                  }
                />
                {error && <div className="text-red-500 text-xs">{error}</div>}
              </div>
              <div className="mb-6 relative">
                <div className="relative">
                  <label
                    htmlFor="password"
                    className={`text-sm text-gray-500 px-2 pointer-events-none bg-white transition-all absolute z-30 left-2 top-1/2 -translate-y-1/2 ${
                      passwordFocus ? 'top-[3%] text-xs' : 'top-1/2'
                    }`}
                  >
                    Masukkan Password
                  </label>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    className={`w-full input-primary outline-none before:content-['Hello\_World'] before:block ${
                      passwordError ? 'border-red-500' : 'focus:border-blue-500'
                    }`}
                    onFocus={() => setPasswordFocus(true)}
                    onBlur={() =>
                      password.length > 0
                        ? setPasswordFocus(true)
                        : setPasswordFocus(false)
                    }
                    autoComplete="off"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    className="absolute right-0 -top-1 py-[14px] px-1 rounded-e-xl"
                    onClick={() => setShowPassword(!showPassword)}
                    type="button"
                  >
                    <FontAwesomeIcon
                      icon={showPassword ? faEyeSlash : faEye}
                      className="text-gray-400 h-[13px]"
                      width="32"
                      height="32"
                    />
                  </button>
                </div>
                {passwordError && (
                  <div className="text-red-500 text-xs">{passwordError}</div>
                )}
                <ButtonPrimary text="Masuk" click={handleSubmit} />
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
