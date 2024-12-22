import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../../Context/AuthContext";
import PropTypes from "prop-types";
import FollowButton from "../../Buttons/FollowUserBtn";
import ProfileImage from "../ProfileImage/ProfileImage";
import editIcon from "../../../assets/icon/edit-user-icon.svg";
import UserSocial from "../UserSocial/UserSocial";
import defaultBanner from "../../../assets/banner.png";
import "./userbanner.style.scss";

function UserBanner({ user, handleShowSocial, handleSocialSet }) {
  //eslint-disable-next-line
  const [auth, isAuth] = useContext(AuthContext);
  const isOwner = auth ? auth.name === user.name : false;

  if (!user) {
    return <div className="user-banner full-width"></div>;
  }
  return (
    <>
      <div
        className="user-banner full-width flex-col justify-end radius-md"
        style={{
          backgroundImage: `url(${user.banner ? user.banner : defaultBanner})`,
        }}
      >
        <div className="user-info full-width flex-col align-center">
          <div className="full-width standard-component-width flex-r wrap justify-evenly align-end">
            <div className="flex-col align-center">
              <ProfileImage src={user.avatar} />
              <div className="user-name">{user.name}</div>
            </div>
            <div className="flex-r gap-sm">
              <UserSocial
                user={user}
                handleShow={handleShowSocial}
                handleSet={handleSocialSet}
              />
              {!isOwner ? (
                <FollowButton anotherUser={user} />
              ) : (
                <Link
                  to={`/user/${auth && auth.name}/settings`}
                  className="flex-col align-center small-text full-width light-text"
                >
                  <img
                    src={editIcon}
                    alt="edit profile images"
                    className="edit-icon"
                  />
                  <span>Profile Images</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

UserBanner.propTypes = {
  user: PropTypes.object.isRequired,
  handleShowSocial: PropTypes.func,
  handleSocialSet: PropTypes.func,
};

export default UserBanner;
