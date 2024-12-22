import React from "react";
import { useEffect } from "react";
import { useLocation } from "react-router";
import PropTypes from "prop-types";

function ScrollToTop({ children }) {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return <>{children}</>;
}

ScrollToTop.propTypes = {
  children: PropTypes.node,
};

export default ScrollToTop;
