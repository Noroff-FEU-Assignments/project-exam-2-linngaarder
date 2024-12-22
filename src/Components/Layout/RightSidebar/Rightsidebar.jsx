import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../../Context/AuthContext";
import NewPostButton from "../../Buttons/NewPostBtn";
import allUsersIcon from "../../../assets/icon/all-users-icon.svg";
import NewPost from "../../Menus/NewPost/NewPost";
import "./rightsidebar.style.scss";

function Rightsidebar() {
  // eslint-disable-next-line no-unused-vars
  const [auth, setAuth] = useContext(AuthContext);

  return (
    <div className="right-sidebar flex-col align-center gap-md">
      <NewPost />
      {auth && (
        <>
          <div>
            <Link
              to="/users"
              className="flex-col align-center light-text full-width"
            >
              <img src={allUsersIcon} alt="users" />
              <span>All Users</span>
            </Link>
          </div>
          <div className="flex-col align-center">
            <NewPostButton />
          </div>
        </>
      )}
    </div>
  );
}

export default Rightsidebar;
