import React, { useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../Context/AuthContext";
import MainLayout from "../../Components/Layout/MainLayout/MainLayout";
import PrimaryButton from "../../Components/Buttons/PrimaryBtn";
import introBgImg from "../../assets/bg-img-blue.png";
import "./intropage.style.scss";

function IntroPage() {
  const [auth] = useContext(AuthContext);
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
        style={{ backgroundImage: `url(${introBgImg})` }}
      >
        <section className="flex-r full-width full-height wrap justify-evenly">
          <div className="standard-component-width full-width">
            <div className="flex-col gap-md align-center">
              <div className="flex-col align-center gap-xs">
                <span className="intro-header">Join</span>
                <Link to="/register">
                  <PrimaryButton>Register</PrimaryButton>
                </Link>
              </div>
            </div>
          </div>
          <div className="flex-col align-center gap-xs">
            <span className="intro-header">Already registered?</span>
            <Link to="/login">
              <PrimaryButton>Log In</PrimaryButton>
            </Link>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}

export default IntroPage;
