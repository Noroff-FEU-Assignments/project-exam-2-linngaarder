import React from "react";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import PropTypes from "prop-types";
import "./mainlayout.style.scss";

function MainLayout({ children }) {
  return (
    <div id="main-page-layout">
      <Header />
      <Main>{children}</Main>
      <Footer />
    </div>
  );
}

MainLayout.propTypes = {
  children: PropTypes.node,
};

export default MainLayout;
