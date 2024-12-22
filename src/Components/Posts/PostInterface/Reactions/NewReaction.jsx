import React from "react";
import ReactionForm from "../../../Forms/ReactionForm/ReactionForm";
import PropTypes from "prop-types";

function NewReaction({ postID }) {
  return (
    <div>
      <ReactionForm postID={postID} />
    </div>
  );
}

NewReaction.propTypes = {
  postID: PropTypes.number.isRequired,
};

export default NewReaction;
