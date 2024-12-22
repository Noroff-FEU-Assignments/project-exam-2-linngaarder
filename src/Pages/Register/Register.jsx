import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RegisterForm from "../../Components/Forms/RegisterForm/RegisterForm";
import MainLayout from "../../Components/Layout/MainLayout/MainLayout";
import Heading from "../../Components/Typography/Heading";
import AuthContext from "../../Context/AuthContext";
import registerBgImg from "../../assets/bg-img-green.png";
import "./register.style.scss";

function Register() {
  //eslint-disable-next-line
  const [auth, setAuth] = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (auth) {
      navigate("/home");
    }
  });
  return (
    <MainLayout>
      <div
        className="full-height"
        style={{ backgroundImage: `url(${registerBgImg})` }}
      >
        <div className="flex-col top-level-indent full-width pb-5">
          <div className="flex-col full-width align-center gap-lg">
            <Heading className="register-heading">Register</Heading>
            <div className="flex-col full-width standard-component-width gap-sm">
              <RegisterForm />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default Register;
