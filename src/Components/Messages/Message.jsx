import React from "react";
import PropTypes from "prop-types";

function Message({ children, type = "", className = "" }) {
  return <div className={`message ${type} ${className}`}>{children}</div>;
}

Message.propTypes = {
  children: PropTypes.node,
  type: PropTypes.string,
  className: PropTypes.string,
};

export default Message;
