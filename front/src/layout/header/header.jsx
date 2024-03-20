import { Link } from "react-router-dom";
import Logo from "../../assets/argentBankLogo.png";

import "./header.css";

import { useSelector, useDispatch } from "react-redux";
import { setLogOut } from "../../redux/reducers/userAuthSlice";

function Hearder() {
  const token = useSelector((state) => state.userAuth.token);
  const profile = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  return (
    <nav className="main-nav">
      <Link to="/" className="main-nav-logo">
        <img
          className="main-nav-logo-image"
          src={Logo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        {token && (
          <Link className="main-nav-item" to="./user">
            {profile.userName}
          </Link>
        )}
        <Link
          className="main-nav-item"
          to={token ? "./" : "./signIn/"}
          onClick={() => {
            if (token) {
              dispatch(setLogOut({}));
            }
          }}>
          <i className="fa fa-user-circle"></i>
          {token ? " Sign Out" : " Sign In"}
        </Link>
      </div>
    </nav>
  );
}

export default Hearder;
