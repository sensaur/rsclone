import { Link } from 'react-router-dom';
import logo from '../images/logo.svg';

function NavBarStart() {
  return (
    <div>
      <nav>
        <div>
          <Link to="/">
            <img id="logoNavBar" src={logo} alt="logo" />
            <button type="button">
              <span />
            </button>
          </Link>
          <div id="navbarNavAltMarkup">
            <div>
              <Link to="login">Войти</Link>
            </div>
            <div>
              <Link to="signup">Зарегистрироваться</Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBarStart;
