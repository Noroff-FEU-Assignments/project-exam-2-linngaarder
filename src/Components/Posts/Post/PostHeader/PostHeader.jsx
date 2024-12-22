import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ProfileImage from "../../../User/ProfileImage/ProfileImage";
import menuIcon from "../../../../assets/icon/icon-ellipsis.svg";
import OwnerInteraction from "../../PostInterface/OwnerInteraction/OwnerInteraction";
import Message from "../../../Messages/Message";

function PostHeader({ data, isOwner, close }) {
  const [showOwnerInteraction, setShowOwnerInteraction] = useState(false);
  const handleShowOwnerInteraction = () =>
    setShowOwnerInteraction(!showOwnerInteraction);

  return (
    <div
      className="post-header flex-r full-width justify-between"
      style={{ height: "64px" }}
    >
      {!showOwnerInteraction ? (
        <HeaderInfo data={data} />
      ) : (
        <OwnerInteraction post={data} close={close} />
      )}
      {isOwner && (
        <div className="">
          <button onClick={handleShowOwnerInteraction} className="distinct">
            <img src={menuIcon} alt="menu" />
          </button>
        </div>
      )}
    </div>
  );
}

PostHeader.propTypes = {
  data: PropTypes.object.isRequired,
  isOwner: PropTypes.bool.isRequired,
  close: PropTypes.func,
};
export default PostHeader;

function HeaderInfo({ data }) {
  const dateCreated = new Date(data.created);
  return (
    <div className="header-info flex-r full-width gap-xs">
      <Link to={`/user/${data.author.name}`}>
        <ProfileImage src={data.author.avatar ? data.author.avatar : ""} />
      </Link>
      <div className="flex-col align-between gap-xxs">
        <Link to={`/user/${data.author.name}`} className="post-author-name">
          <span className="author-name">{data.author.name}</span>
        </Link>
        <div className="post-created flex-r gap-xxs small-text">
          {dateCreated ? (
            <>
              <span className="post-date">
                {dateCreated.toLocaleDateString("en-GB")}
              </span>
              <span className="post-time">
                {dateCreated.toLocaleTimeString("en-GB")}
              </span>
            </>
          ) : (
            <Message type="error">Invalid Date</Message>
          )}
        </div>
      </div>
    </div>
  );
}

HeaderInfo.propTypes = {
  data: PropTypes.object.isRequired,
};
