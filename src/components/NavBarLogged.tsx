import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo2 from '../images/add-file.svg';
import ava from '../images/avaDefault.jpg';
import { useAppSelector } from '../hooks/redux';

function activateBurger() {
  const burgerBtn = document.getElementById('burger') as HTMLButtonElement;
  const burgerMenu = document.getElementById('navbarNavAltMarkup') as HTMLButtonElement;
  burgerBtn.classList.toggle('_active');
  burgerMenu.classList.toggle('menu-active');
}

function NavBarLogged() {
  const { user } = useAppSelector((state) => state.userSlice);

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <nav className="bg-color5 md:px-9 px-2 py-3">
      <div className="flex justify-between items-center">
        <img id="logoNavBar" src={logo2} alt="" />
        <button
          className="md:hidden menu-icon"
          type="button"
          id="burger"
          onClick={() => activateBurger()}
        >
          <span />
        </button>
        <div className="menu-container menu md:translate-x-0" id="navbarNavAltMarkup">
          <div className="menu-content">
            <div className="flex items-center">
              <Link className="btn" to="/boards">
                All boards
              </Link>
            </div>
            <div className="flex items-center">
              <Link className="btn" aria-current="page" to="/">Create board</Link>
            </div>
            <div className="flex items-center">
              <Link className="btn" aria-current="page" to="/editprofile">Edit profile</Link>
            </div>
            <div className="flex items-center md:text-base text-xs">
              Logged as
              {` ${user?.userName}`}
            </div>
            <div>
              <img id="avatar" src={ava} alt="" />
            </div>
            <div className="flex items-center">
              <Link className="btn" to="logout">Sing out</Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBarLogged;
