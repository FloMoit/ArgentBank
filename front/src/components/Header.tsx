import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../assets/logo/logo.png";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authLogoutService } from "../redux/Auth/authentificationServices";

function Header() {
  const { pathname }: { pathname: string } = useLocation();
  const navigate = useNavigate();

  const reduxDispatch = useDispatch();
  const connectedSelector: boolean = useSelector(
    (state) => state.authentication.isConnected
  );
  const firstNameSelector: string = useSelector(
    (state) => state.userInfos.data.firstName
  );

  const handleLogout = () => {
    reduxDispatch(authLogoutService);
    navigate("/");
  };

  useEffect(() => {
    let pageName: string = "";

    switch (pathname) {
      case "/":
        pageName = "Home";
        break;
      case "/login":
        pageName = "Login";
        break;
      case "/profile":
        pageName = "Dashboard";
        break;
      default:
        pageName = "Error";
    }

    document.title = `Argent Bank - ${pageName} Page`;
  }, [pathname]);

  return (
    <header>
      <nav className="main-nav">
        <Link className="main-nav__logo" to="/">
          <img className="main-nav__logo__image" src={Logo} alt="logo" />
          <h1 className="sr-only">Argent Bank</h1>
        </Link>

        {connectedSelector ? (
          <div>
            <Link className="main-nav__item" to="/profile">
              <span className="fa fa-user-circle"></span>
              <span> {firstNameSelector}</span>
            </Link>

            <button
              className="main-nav__item main-nav__item--btn"
              onClick={handleLogout}>
              <span className="fa fa-sign-out"></span>
              <span> Sign Out</span>
            </button>
          </div>
        ) : (
          <Link className="main-nav__item" to="/login">
            <span className="fa fa-user-circle"></span>
            <span> Sign In</span>
          </Link>
        )}
      </nav>
    </header>
  );
}

export default Header;
