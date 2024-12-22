import React from "react";
import PropTypes from "prop-types";
import "./centercolumn.style.scss";

function CenterColumn({ children }) {
  return (
    <>
      <div
        id="center-column"
        className="flex-col justify-start align-center gap-lg p-2 full-width full-height"
      >
        {children}
      </div>
    </>
  );
}

CenterColumn.propTypes = {
  children: PropTypes.node,
};
export default CenterColumn;
