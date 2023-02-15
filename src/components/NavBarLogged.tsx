import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo2 from '../images/add-file.svg';
import ava from '../images/avaDefault.jpg';
import { useAppSelector } from '../hooks/redux';

function NavBarLogged() {
  const { user } = useAppSelector((state) => state.userSlice);

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <nav className="bg-color5 px-10 py-3">
      <div className="flex justify-between">
        <img id="logoNavBar" src={logo2} alt="" />
        <button
          type="button"
        >
          <span />
        </button>
        <div
          className="flex md:gap-7 gap-3"
          id="navbarNavAltMarkup"
        >
          <div className="flex items-center">
            <Link className="btn" to="/allboards">
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
    </nav>
  );
}

export default NavBarLogged;
