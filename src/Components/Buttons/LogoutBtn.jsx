import React, { useContext } from "react";
import AuthContext from "../../Context/AuthContext";
import PrimaryButton from "./PrimaryBtn";

function LogoutButton() {
  // eslint-disable-next-line no-unused-vars
  const [auth, setAuth] = useContext(AuthContext);
  function logout() {
    setAuth(null);
  }
  return <PrimaryButton onClick={logout}>Log Out</PrimaryButton>;
}

export default LogoutButton;
