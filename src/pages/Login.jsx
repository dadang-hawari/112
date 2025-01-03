import { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import ButtonPrimary from '../components/Common/ButtonPrimary';
import { userLogin } from '../services/authService';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [usernameFocus, setUsernameFocus] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // State untuk theme
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') === 'dark' ? 'dark' : 'light',
  );

  // Mengubah class pada elemen root berdasarkan state theme
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const _token = import.meta.env.VITE_DOMAIN_TOKEN;
    const ip_address = '';
    userLogin(username, password, _token, ip_address, dispatch, navigate);
  };

  return (
    <div className="w-full md:flex h-screen bg-white dark:bg-[#111827] justify-center px-4">
      <div className="flex w-full max-w-lg  mx-auto bg-inherit mt-20 items-center border justify-center max-h-[400px] rounded-md h-full my-auto px-5 ">
        <div className="w-full relative bg-inherit">
          <img
            src="/images/logo.png"
            alt="Logo Kota Makassar & KOMINFO Makassar"
            className="w-full max-w-48 mt-10 mx-auto"
            width="504"
            height="250"
          />
          <form className="bg-white dark:bg-[#111827] ">
            <div className="mt-2 relative pt-1 bg-white dark:bg-[#111827]">
              <label
                htmlFor="username"
                className={`text-sm text-tremor-content bg-inherit px-2 pointer-events-none  transition-all absolute z-30 left-2 top-1/2 -translate-y-1/2 ${
                  usernameFocus ? 'top-[3%] text-xs ' : 'top-1/2'
                }`}
              >
                Masukkan username
              </label>
              <input
                id="username"
                type="text"
                className={`w-full input-primary text-tremor-content outline-none bg-inherit focus:border-blue-500`}
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
            <div className="my-4 relative  bg-white dark:bg-[#111827]">
              <div className="relative pt-1  dark:bg-[#111827]">
                <label
                  htmlFor="password"
                  className={`text-sm dark:bg-[#111827] bg-white  text-tremor-content px-2 pointer-events-none transition-all absolute z-30 left-2 top-1/2 -translate-y-1/2 ${
                    passwordFocus ? 'top-[3%] text-xs' : 'top-1/2'
                  }`}
                >
                  Masukkan Password
                </label>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  className={`w-full bg-white input-primary text-tremor-content dark:bg-[#111827] outline-none before:content-['Hello\_World'] before:block ${
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
                  className="absolute right-0 top-1/2 -translate-y-1/2 py-3px-1 rounded-e-xl"
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
              <ButtonPrimary
                text="Masuk"
                click={handleSubmit}
                buttonType="submit"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
