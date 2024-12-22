import React, { useState } from "react";
import { postsUrl } from "../../../../../Constants/Apis";
import CreateComment from "../../../../Forms/CreateCommentForm/CreateCommentForm";
import PropTypes from "prop-types";

function ReplyToComment({ replyToId, postID }) {
  const [show, setShow] = useState(false);

  const url = postsUrl + `/${postID}/comment`;

  function handleShow() {
    setShow(!show);
  }
  return (
    <>
      <button onClick={handleShow} className="distinct">
        Reply
      </button>
      {show && (
        <CreateComment url={url} replyID={replyToId} close={handleShow} />
      )}
    </>
  );
}

ReplyToComment.propTypes = {
  replyToId: PropTypes.number.isRequired,
  postID: PropTypes.number.isRequired,
};

export default ReplyToComment;
