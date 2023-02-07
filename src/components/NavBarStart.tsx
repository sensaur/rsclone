import { Link } from 'react-router-dom';
import logo from '../images/logo.svg';

function NavBarStart() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <Link to="/">
            <img id="logoNavBar" src={logo} alt="logo" className="navbar-brand mx-3" />
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
          </Link>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link className="nav-link active" aria-current="page" to="login">Войти</Link>
            </div>
            <div className="navbar-nav">
              <Link className="nav-link active" aria-current="page" to="signup">Зарегистрироваться</Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBarStart;
