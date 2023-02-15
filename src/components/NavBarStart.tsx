import { Link } from 'react-router-dom';
import logo2 from '../images/add-file.svg';

function NavBarStart() {
  return (
    <div className="my-0 bg-color5 md:px-9 px-2 py-3">
      <nav>
        <div className="flex justify-between">
          <Link className="flex items-center" to="/">
            <img id="logoNavBar" src={logo2} alt="logo" />
            <button type="button">
              <span />
            </button>
          </Link>
          <div className="flex gap-7" id="navbarNavAltMarkup">
            <div className="flex items-center">
              <Link className="btn" to="login">Sing in</Link>
            </div>
            <div className="flex items-center">
              <Link className="btn" to="signup">Sing up</Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBarStart;
// button style: px-3 py-1 bg-color2 rounded-md hover:bg-color1 hover:text-color3
