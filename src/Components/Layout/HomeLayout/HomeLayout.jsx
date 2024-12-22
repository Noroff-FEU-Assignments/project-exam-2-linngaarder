import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../Context/AuthContext";
import { RefreshProvider } from "../../../Context/RefreshContext";
import { ShowNewPostContextProvider } from "../../../Context/ShowNewPostContext";
import PropTypes from "prop-types";
import Leftsidebar from "../LeftSidebar/Leftsidebar";
import CenterColumn from "../CenterColumn";
import Rightsidebar from "../RightSidebar/Rightsidebar";
import "./homelayout.style.scss";

function HomeLayout({ children }) {
  const navigate = useNavigate();
  //eslint-disable-next-line
  const [auth, setAuth] = useContext(AuthContext);

  useEffect(() => {
    if (!auth) {
      navigate("/");
    }
  });

  return (
    <>
      {auth && (
        <ShowNewPostContextProvider>
          <div>
            <div className="layout-content flex-r justify-start align-start full-width full-height indent">
              <Leftsidebar />
              <CenterColumn>
                <RefreshProvider>{children}</RefreshProvider>
              </CenterColumn>
              <Rightsidebar />
            </div>
          </div>
        </ShowNewPostContextProvider>
      )}
    </>
  );
}

HomeLayout.propTypes = {
  children: PropTypes.node,
};

export default HomeLayout;
