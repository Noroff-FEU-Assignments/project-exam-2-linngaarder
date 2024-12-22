import React, { useContext } from "react";
import PropTypes from "prop-types";
import AuthContext from "../../../Context/AuthContext";
import PostContent from "./PostContent/PostContent";
import "./post.style.scss";

function Post({ children, data, close, handleShow, isOpen = false }) {
  //eslint-disable-next-line
  const [auth, setAuth] = useContext(AuthContext);
  const isOwner = auth && auth.email === data.author.email ? true : false;

  return (
    <div
      className={`post full-width standard-component-width ${
        isOwner && "owner"
      } radius-sm flex-col gap-md`}
    >
      {isOpen && (
        <button type="button" className="distinct close-button" onClick={close}>
          Close
        </button>
      )}
      <PostContent
        data={data}
        isOwner={isOwner}
        handleShow={handleShow ? handleShow : undefined}
        close={close}
      />
      {children}
    </div>
  );
}

Post.propTypes = {
  children: PropTypes.node.isRequired,
  data: PropTypes.object.isRequired,
  close: PropTypes.func,
  handleShow: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default Post;
