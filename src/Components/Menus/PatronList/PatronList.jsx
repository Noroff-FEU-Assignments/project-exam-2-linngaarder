import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import ProfileImage from "../../User/ProfileImage/ProfileImage";
import "./patronlist.style.scss";

function PatronList({ patrons, handleShow }) {
  function RenderPatrons({ patrons }) {
    if (patrons) {
      return (
        <ul className="patrons no-list-style flex-col align-center full-width gap-md">
          {patrons.map((patron) => {
            return <Patron patron={patron} action={handleShow} />;
          })}
        </ul>
      );
    }
  }

  return (
    <div
      className="patron-list flex-col p-3 gap-sm full-width smaller-component-width"
      onMouseLeave={handleShow}
    >
      <button className="distinct" onClick={handleShow}>
        Close
      </button>
      <RenderPatrons patrons={patrons} />
      <button className="distinct" onClick={handleShow}>
        Close
      </button>
    </div>
  );
}

PatronList.propTypes = {
  patrons: PropTypes.array,
  handleShow: PropTypes.func.isRequired,
};

export default PatronList;

function Patron({ patron, action }) {
  return (
    <li className="patron flex-r full-width">
      <Link
        to={`/user/${patron.name}`}
        className="flex-r wrap align-center full-width light-text gap-md"
        onClick={action}
      >
        <ProfileImage src={patron.avatar} />
        <span className="user-name">{patron.name}</span>
      </Link>
    </li>
  );
}
