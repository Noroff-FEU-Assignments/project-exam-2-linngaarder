import React from "react";
import PropTypes from "prop-types";
import PostFooter from "../Post/PostFooter/PostFooter";
import ClickableWrapper from "../../Utilities/ClickableWrapper/ClickableWrapper";
import Post from "../Post/Post";

function PostListItem({ data, showSingle }) {
  function handleShow() {
    showSingle({ id: data.id });
  }
  return (
    <li
      className={`post-list-item flex-col align-center full-width radius-sm `}
    >
      <Post data={data} handleShow={handleShow}>
        <ClickableWrapper onClick={handleShow}>
          <PostFooter data={data} />
        </ClickableWrapper>
      </Post>
    </li>
  );
}

PostListItem.propTypes = {
  data: PropTypes.object.isRequired,
  showSingle: PropTypes.func.isRequired,
};

export default PostListItem;
