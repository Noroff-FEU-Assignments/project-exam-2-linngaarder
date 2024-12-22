import React from "react";
import PropTypes from "prop-types";
import "./heading.style.scss";

function Heading({ children, size = 1, className = "" }) {
  const HSize = `h${size}`;
  return (
    <HSize className={`text-center heading-colour ${className}`}>
      {children}
    </HSize>
  );
}

Heading.propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.number,
  className: PropTypes.string,
};

export default Heading;
