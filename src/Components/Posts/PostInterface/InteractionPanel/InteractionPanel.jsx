import React from "react";
import CommentCount from "../Comment/CommentCount/CommentCount";
import DisplayComment from "../Comment/DisplayComment/DisplayComment";
import DisplayReaction from "../Reactions/DisplayReaction";
import NewReaction from "../Reactions/NewReaction";
import PropTypes from "prop-types";

function InteractionPanel({ data }) {
  return (
    <div className="interaction-panel post-footer p-3 gap-sm">
      <div className="counts flex-r full-width justify-evenly">
        <CommentCount data={data} />
      </div>
      <DisplayReaction reactionData={data.reactions} />
      <div className="flex-col gap-sm">
        <NewReaction postID={data.id} />
        <DisplayComment commentData={data.comments} postID={data.id} />
      </div>
    </div>
  );
}

InteractionPanel.propTypes = {
  data: PropTypes.object.isRequired,
};

export default InteractionPanel;
