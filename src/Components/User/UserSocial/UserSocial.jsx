import React from "react";
import PropTypes from "prop-types";

function UserSocial({ user, handleShow, handleSet }) {
  async function handleShowSocial(target) {
    switch (target) {
      case "followers":
        handleSet(user.followers);
        handleShow();
        break;
      case "following":
        handleSet(user.following);
        handleShow();
        break;
      default:
        break;
    }
  }
  return (
    <>
      <div className="flex-r gap-sm">
        <button
          onMouseOver={() => {
            handleShowSocial("followers");
          }}
          className="flex-col align-center distinct light-text"
        >
          <span className="brand-text text-md">{user._count.followers}</span>
          <span className="small-text">Followers</span>
        </button>
        <button
          onMouseOver={() => {
            handleShowSocial("following");
          }}
          className="flex-col align-center distinct light-text"
        >
          <span className="brand-text text-md">{user._count.following}</span>
          <span className="small-text">Following</span>
        </button>
      </div>
    </>
  );
}

UserSocial.propTypes = {
  user: PropTypes.object.isRequired,
  handleShow: PropTypes.func.isRequired,
  handleSet: PropTypes.func.isRequired,
};

export default UserSocial;
