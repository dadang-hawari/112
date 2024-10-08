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
    screenWidth > 640 ? setShowMenu(false) : setShowMenu(true);
  }, [screenWidth]);

  useEffect(() => {
    setShowMenu(false);
  }, []);

  return (
    <header
      className={`bg-transparent fixed z-50 ${
        showMenu ? 'h-full top-10 backdrop-blur-sm shadow-md' : ''
      }  text-white transition-all duration-300 w-full ${
        scrollValue > 50 && 'backdrop-blur-sm shadow-md'
      } `}
    >
      <nav className="flex justify-between  items-center px-5">
        <div className="logo z-40">
          <img src="../images/logo-mks-kominfo.webp" alt="" />
        </div>

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
              className={`${path !== '/' && 'text-black opacity-60'}`}
            >
              Beranda
            </Link>
          </li>
          <li className="">
            <Link
              to="/fungsi"
              className={`${
                path !== '/' && 'text-black font-bold'
              } transition-opacity duration-1000   ${
                path === '/fungsi' ? 'opacity-100' : 'opacity-60'
              }`}
            >
              Menu
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
