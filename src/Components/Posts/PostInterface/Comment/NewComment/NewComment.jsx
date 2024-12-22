import React from "react";
import { postsUrl } from "../../../../../Constants/Apis";
import CreateComment from "../../../../Forms/CreateCommentForm/CreateCommentForm";
import PropTypes from "prop-types";

function NewComment({ postID }) {
  const url = postsUrl + `/${postID}/comment`;
  return (
    <div>
      <CreateComment url={url} />
    </div>
  );
}

NewComment.propTypes = {
  postID: PropTypes.number.isRequired,
};

export default NewComment;
