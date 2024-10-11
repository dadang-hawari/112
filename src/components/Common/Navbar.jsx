import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
export default function Navbar() {
  const path = useLocation().pathname;
  const [scrollValue, setScrollValue] = useState(window.scrollY);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [showMenu, setShowMenu] = useState(false);
  const handleScroll = () => {
    setScrollValue(window.scrollY);
  };
  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    screenWidth > 640 ? setShowMenu(false) : setShowMenu(false);
  }, [screenWidth]);

  // State untuk theme
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') === 'dark' ? 'dark' : 'light',
  );

  // Fungsi untuk toggle tema
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  // Mengubah class pada elemen root berdasarkan state theme
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    setShowMenu(false);
  }, []);

  return (
    <header
      className={`bg-transparent fixed z-50 ${
        showMenu ? 'h-full backdrop-blur-sm shadow-md' : ''
      }  text-white transition-all duration-300 w-full ${
        scrollValue > 50 && 'backdrop-blur-sm shadow-md'
      } `}
    >
      <nav className="flex justify-between  items-center px-5">
        <div className="logo z-40">
          <img src="../images/logo-mks-kominfo.webp" alt="" />
        </div>
        <button
          className="py-2 px-4 mb-5 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded"
          onClick={toggleTheme}
        >
          {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
        </button>
        <button
          className={`text-xl ${
            path === '/' ? 'text-white' : 'text-gray-800'
          }  opacity-60 font-bold sm:hidden z-50`}
          onClick={() => setShowMenu(!showMenu)}
        >
          {showMenu ? 'X' : '☰'}
        </button>
        <ul
          className={`gap-5 ${
            showMenu &&
            'flex flex-col sm:block bg-black pt-32 bg-opacity-50 opacity-100 w-full h-screen px-5 py-5 rounded-m '
          } sm:flex absolute ${
            !showMenu && 'hidden'
          }  left-1/2  top-0 z-10 text-4xl sm:text-base -translate-x-1/2 sm:translate-x-[unset]  sm:static`}
        >
          <li className="font-bold ">
            <Link
              to="/"
              className={`${path !== '/' && 'font-normal opacity-60'}`}
            >
              Beranda
            </Link>
          </li>
          <li className="">
            <Link
              to="/report"
              className={`${
                path !== '/' && ' font-bold'
              } transition-opacity duration-1000   ${
                path === '/report' ? 'opacity-100' : 'opacity-60'
              }`}
            >
              Report
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
