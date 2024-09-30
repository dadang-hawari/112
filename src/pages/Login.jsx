import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import ButtonPrimary from '../components/ButtonPrimary';
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    const _token = import.meta.env.VITE_DOMAIN_TOKEN;
    const ip_address = '';
    userLogin(username, password, _token, ip_address, dispatch, navigate);
  };

  return (
    <div className="w-full md:flex h-screen justify-center px-4">
      <div className="flex w-full max-w-lg h-ful mx-auto mt-20 items-center border justify-center max-h-80 rounded-md h-full my-auto px-5 ">
        <div className="w-full relative">
          <img
            src="/images/logo.png"
            alt="Logo Kota Makassar & KOMINFO Makassar"
            className="w-full max-w-48 mt-10 mx-auto"
            width="504"
            height="250"
          />
          <form>
            <div className="mt-2 relative pt-1">
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
            <div className="my-4 relative ">
              <div className="relative pt-1">
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
