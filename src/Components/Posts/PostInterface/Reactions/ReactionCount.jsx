import React from "react";
import PropTypes from "prop-types";
import reactionIcon from "../../../../assets/icon/reaction-icon.svg";
import "./reactioncount.style.scss";

function ReactionCount({ data }) {
  const getProperCount = () => {
    if (data.reactions) {
      let total = 0;
      data.reactions.forEach((r) => (total += r.count));
      return total;
    } else return 0;
  };
  return (
    <div className="interact-count reactions-count flex-col align-center show-interact">
      <div className="count">
        <div className="flex-r full-width align-between justify-center gap-xxs">
          <img src={reactionIcon} alt="reaction" className="reaction-icon" />
          <span className="number">
            {data.reactions.length > 0 ? getProperCount() : ""}
          </span>
        </div>
        <div className="caption small-text">Reactions</div>
      </div>
    </div>
  );
}

ReactionCount.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ReactionCount;
