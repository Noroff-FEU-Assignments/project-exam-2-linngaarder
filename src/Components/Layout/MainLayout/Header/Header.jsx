import React, { useContext } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import AuthContext from "../../../../Context/AuthContext";
import logo from "../../../../assets/mainlogo.png";
import LogoutButton from "../../../Buttons/LogoutBtn";
import "./header.style.scss";

function Header() {
  const [auth] = useContext(AuthContext);

  return (
    <Navbar className="indent nav-styling navbar-expand-md">
      <NavLink to={auth ? "/home" : "/"}>
        <Navbar.Brand>
          <img src={logo} alt="post-social logo" />
        </Navbar.Brand>
      </NavLink>
      <Navbar.Toggle aria-controls="global-nav-menu" />
      <Navbar.Collapse id="global-nav-menu">
        <Nav className="ms-auto">
          {auth ? (
            <LogoutButton />
          ) : (
            <NavLink className="nav-link" to="/login">
              Log In
            </NavLink>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
