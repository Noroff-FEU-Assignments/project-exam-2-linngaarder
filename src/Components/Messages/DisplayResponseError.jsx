import React from "react";
import PropTypes from "prop-types";

function DisplayResponseErrors({ data }) {
  let key = 0;
  return (
    <ul className="error response-errors">
      {data.length > 0 &&
        data.map((item) => {
          key++;
          return <li key={key}>{item.message}</li>;
        })}
    </ul>
  );
}

DisplayResponseErrors.propTypes = {
  data: PropTypes.array.isRequired,
};

export default DisplayResponseErrors;
