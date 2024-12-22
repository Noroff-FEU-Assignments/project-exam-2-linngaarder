import React from "react";
import PropTypes from "prop-types";
import "./clickablewrapper.style.scss";

function ClickableWrapper({ onClick, children }) {
  return (
    <button className="clickable distinct full-width p-0" onClick={onClick}>
      {children}
    </button>
  );
}

ClickableWrapper.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default ClickableWrapper;
