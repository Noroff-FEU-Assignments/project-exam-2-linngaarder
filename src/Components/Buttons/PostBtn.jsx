import React from "react";
import PropTypes from "prop-types";
import "./postbtn.style.scss";

function PostButton({ children, onClick, type, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`post-button ${className}`}
      type={type}
    >
      {children}
    </button>
  );
}

PostButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.string,
  className: PropTypes.string,
};

export default PostButton;
