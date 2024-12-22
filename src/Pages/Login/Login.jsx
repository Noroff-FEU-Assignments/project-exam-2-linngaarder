import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../Context/AuthContext";
import LoginForm from "../../Components/Forms/LoginForm/LogInForm";
import MainLayout from "../../Components/Layout/MainLayout/MainLayout";
import Heading from "../../Components/Typography/Heading";
import loginBgImg from "../../assets/bg-img-green.png";
import "./login.style.scss";

function Login() {
  const navigate = useNavigate();
  //eslint-disable-next-line
  const [auth, setAuth] = useContext(AuthContext);

  useEffect(() => {
    if (auth) {
      navigate("/home");
    }
  });
  return (
    <MainLayout>
      <div
        className="full-height"
        style={{ backgroundImage: `url(${loginBgImg})` }}
      >
        <div className="flex-col top-level-indent full-width align-center gap-lg">
          <Heading className="login-heading">Log In</Heading>
          <LoginForm />
        </div>
      </div>
    </MainLayout>
  );
}

export default Login;
