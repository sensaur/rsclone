import { Link } from 'react-router-dom';
import logo from '../images/logo.svg';
import { useAppSelector } from '../hooks/redux';

function NavBarLogged() {
  const { user } = useAppSelector((state) => state.userSlice);

  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <img id="logoNavBar" src={logo} alt="" className="navbar-brand mx-3" />
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div
          className="collapse navbar-collapse d-flex-lg justify-content-around"
          id="navbarNavAltMarkup"
        >
          <div className="navbar-nav">
            <Link className="nav-link" aria-current="page" to="/alldesks">Все доски</Link>
          </div>
          <div className="navbar-nav">
            <Link className="nav-link" aria-current="page" to="/">Создать доску</Link>
          </div>
          <div className="navbar-nav">
            <Link className="nav-link" aria-current="page" to="/">Редактировать профиль</Link>
          </div>
          <div className="badge bg-secondary">
            Вы вошли как
            {` ${user?.name}`}
          </div>
          <div className="navbar-nav">
            <Link className="nav-link" aria-current="page" to="logout">Выйти</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBarLogged;
