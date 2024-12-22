import React, { useContext } from "react";
import { HashLink } from "react-router-hash-link";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import NewComment from "../NewComment/NewComment";
import AuthContext from "../../../../../Context/AuthContext";
import ReplyToComment from "../ReplyToComment/ReplyToComment";
import "./displaycomment.style.scss";

function DisplayComment({ commentData, postID }) {
  return (
    <div className="comment-display flex-col full-width gap-sm">
      <NewComment postID={postID} />
      {commentData &&
        commentData.map((comment) => {
          return (
            <Comment
              comment={comment}
              allComments={commentData}
              postID={postID}
            />
          );
        })}
    </div>
  );
}

DisplayComment.propTypes = {
  commentData: PropTypes.array.isRequired,
  postID: PropTypes.number.isRequired,
};

export default DisplayComment;

function Comment({ comment, allComments, postID }) {
  //eslint-disable-next-line
  const [auth, setAuth] = useContext(AuthContext);

  const reply = comment.replyToId
    ? allComments.filter((com) => com.id === comment.replyToId)
    : null;
  const dateCreated = new Date(comment.created);

  const location = useLocation().pathname;

  return (
    <div
      className="comment p-2 flex-col gap-xxs"
      id={`${postID}/${comment.id}`}
      key={comment.id}
    >
      <div className="comment-header flex-col">
        <Link to={`/user/${comment.owner}`}>
          <span className="comment-author user-name">{comment.owner}</span>
        </Link>
        <div className="small-text flex-r gap-xxs">
          <span className="post-date">
            {dateCreated.toLocaleDateString("en-GB")}
          </span>
          <span className="post-time">
            {dateCreated.toLocaleTimeString("en-GB")}
          </span>
        </div>
      </div>
      {reply && (
        <div className="reply-to ps-4 pe-4 pt-2 pb-2 radius-sm">
          <HashLink to={`${location}#${postID}/${reply[0].id}`}>
            <span className="op">{reply[0].owner}</span>
          </HashLink>
          <p>{reply[0].body}</p>
        </div>
      )}
      <div className="comment-body p-2">{comment.body}</div>
      <div className="flex-col align-end">
        <ReplyToComment replyToId={comment.id} postID={postID} />
      </div>
      <div className="bottom-border"></div>
    </div>
  );
}

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  allComments: PropTypes.array.isRequired,
  postID: PropTypes.number.isRequired,
};
