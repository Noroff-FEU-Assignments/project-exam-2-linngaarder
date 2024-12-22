import React from "react";
import PropTypes from "prop-types";
import "./primarybtn.style.scss";

function PrimaryButton({ children, onClick, type, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`primary-button ${className}`}
      type={type}
    >
      {children}
    </button>
  );
}

PrimaryButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.string,
  className: PropTypes.string,
};

export default PrimaryButton;
