import React from "react";
import PropTypes from "prop-types";
import CommentCount from "../../PostInterface/Comment/CommentCount/CommentCount";
import ReactionCount from "../../PostInterface/Reactions/ReactionCount";
import "./postfooter.style.scss";

function PostFooter({ data }) {
  return (
    <div className="post-footer p-2 flex-r justify-evenly full-width">
      <CommentCount data={data} />
      <ReactionCount data={data} />
    </div>
  );
}

PostFooter.propTypes = {
  data: PropTypes.object.isRequired,
};

export default PostFooter;
