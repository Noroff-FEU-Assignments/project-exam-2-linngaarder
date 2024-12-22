import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../../Context/AuthContext";
import homeIcon from "../../../assets/icon/home-icon.svg";
import "./leftsidebar.style.scss";

function Leftidebar() {
  // eslint-disable-next-line no-unused-vars
  const [auth, setAuth] = useContext(AuthContext);

  return (
    <div className="left-sidebar flex-col align-center gap-md">
      {auth && (
        <>
          <Link
            to={`/user/${auth.name}`}
            className="user-name light-text flex-col align-center full-width gap-xs"
          >
            {auth.name}
          </Link>
          <Link to={`/home`} className="light-text">
            <img src={homeIcon} alt="users" />
            <span>Home</span>
          </Link>
        </>
      )}
    </div>
  );
}

export default Leftidebar;
