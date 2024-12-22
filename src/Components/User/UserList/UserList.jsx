import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { userUrl } from "../../../Constants/Apis";
import useGet from "../../../Hooks/UseGet";
import SetApiOffset from "../../Utilities/SetApiOffset/SetApiOffset";
import ProfileImage from "../ProfileImage/ProfileImage";
import PropTypes from "prop-types";
import DisplayResponseErrors from "../../Messages/DisplayResponseError";
import "./userlist.style.scss";

function UserList() {
  const RATE_LIMIT = 40;
  const [offset, setOffset] = useState(0);
  const [limitReached, setLimitReached] = useState(false);

  const defaultUrl = userUrl + "?_followers=true&sort=name&sortOrder=asc";
  const [url, setUrl] = useState(
    defaultUrl + `&limit=${RATE_LIMIT}&offset=${offset}`
  );

  useEffect(() => {
    setUrl(defaultUrl + `&limit=${RATE_LIMIT}&offset=${offset}`);
  }, [offset, defaultUrl]);

  const { data, loading, error } = useGet({ url: url });

  useEffect(() => {
    if (data && data.length < RATE_LIMIT) {
      setLimitReached(true);
    } else {
      setLimitReached(false);
    }
  }, [data]);

  return (
    <div className="user-list-container">
      {data && (
        <ul className="user-list flex-r wrap gap-lg justify-around">
          <SetApiOffset
            limit={RATE_LIMIT}
            offset={offset}
            handleOffset={setOffset}
            limitReached={limitReached}
          />
          {data.map((user) => {
            return <UserListItem user={user} key={user.name} />;
          })}
          <SetApiOffset
            limit={RATE_LIMIT}
            offset={offset}
            handleOffset={setOffset}
            limitReached={limitReached}
          />
          {limitReached && <div>No more users found</div>}
        </ul>
      )}
      {loading && <>Loading</>}
      {error && <DisplayResponseErrors data={error.response.data.errors} />}
    </div>
  );
}

export default UserList;

function UserListItem({ user }) {
  return (
    <li className="user-list-item flex-col align-center justify-between gap-lg radius-md">
      <div className="flex-col gap-sm align-center">
        <Link
          to={`/user/${user.name}`}
          className="flex-col align-center light-text"
        >
          <ProfileImage src={user.avatar ? user.avatar : ""} />
          <span className="user-name">{user.name}</span>
        </Link>
      </div>
    </li>
  );
}

UserListItem.propTypes = {
  user: PropTypes.object.isRequired,
};
