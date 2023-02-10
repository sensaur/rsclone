import { Link } from 'react-router-dom';
import logo from '../images/logo.svg';
import { useAppSelector } from '../hooks/redux';

function NavBarLogged() {
  const { user } = useAppSelector((state) => state.userSlice);

  return (
    <nav>
      <div>
        <img id="logoNavBar" src={logo} alt="" />
        <button
          type="button"
        >
          <span />
        </button>
        <div
          id="navbarNavAltMarkup"
        >
          <div>
            <Link to="/alldesks">
              Все
              доски
            </Link>
          </div>
          <div>
            <Link aria-current="page" to="/">Создать доску</Link>
          </div>
          <div>
            <Link aria-current="page" to="/">Редактировать профиль</Link>
          </div>
          <div>
            Вы вошли как
            {` ${user?.name}`}
          </div>
          <div>
            <Link to="logout">Выйти</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBarLogged;
