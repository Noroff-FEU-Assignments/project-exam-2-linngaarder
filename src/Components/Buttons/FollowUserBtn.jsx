import React, { useState, useContext } from "react";
import { userUrl } from "../../Constants/Apis";
import createAxios from "../../Functions/CreateAxios";
import AuthContext from "../../Context/AuthContext";
import RefreshContext from "../../Context/RefreshContext";
import PropTypes from "prop-types";
import "./followuserbtn.style.scss";

function Follow({ anotherUser }) {
  // eslint-disable-next-line no-unused-vars
  const [auth, setAuth] = useContext(AuthContext);
  const [disabled, setDisabled] = useState(false);
  const [refresh, setRefresh] = useContext(RefreshContext);

  const isFollowing = () => {
    let follower = false;
    if (anotherUser.followers) {
      anotherUser.followers.forEach((i) => {
        if (i.name === auth.name) {
          follower = true;
        }
      });
    }
    return follower;
  };

  const [following, setFollowing] = useState(isFollowing());
  const patron = createAxios(auth);
  const url = `${userUrl}/${anotherUser.name}`;

  async function follow() {
    setDisabled(true);
    const followUrl = url + "/follow";
    try {
      const response = await patron.put(followUrl);
      response.status === 200 && setFollowing(true);
    } catch (error) {
    } finally {
      setDisabled(false);
      setRefresh(!refresh);
    }
  }

  async function unfollow() {
    setDisabled(true);
    const unfollowUrl = url + "/unfollow";
    try {
      const response = await patron.put(unfollowUrl);
      response.status === 200 && setFollowing(false);
    } catch (error) {
      console.error(error);
    } finally {
      setDisabled(false);
      setRefresh(!refresh);
    }
  }

  return (
    <button
      onClick={following ? unfollow : follow}
      disabled={disabled}
      className={`distinct follow-button  ${following ? "following" : ""}`}
    >
      {following ? "Unfollow" : "Follow"}
    </button>
  );
}

Follow.propTypes = {
  anotherUser: PropTypes.object.isRequired,
};

export default Follow;
