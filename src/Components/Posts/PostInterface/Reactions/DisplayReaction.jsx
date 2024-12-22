import React from "react";
import PropTypes from "prop-types";

function DisplayReaction({ reactionData }) {
  return (
    <>
      {reactionData && (
        <div className="reaction-display flex-r wrap full-width p-2 gap-xs">
          {reactionData.map((reaction) => {
            return <Reaction data={reaction} key={reaction.symbol} />;
          })}
        </div>
      )}
    </>
  );
}

DisplayReaction.propTypes = {
  reactionData: PropTypes.array.isRequired,
};

export default DisplayReaction;

function Reaction({ data }) {
  return (
    <div className="reaction flex-c align-center">
      <span className="symbol">{data.symbol}</span>
      <span className="count">{data.count}</span>
    </div>
  );
}

Reaction.propTypes = {
  data: PropTypes.object.isRequired,
};
