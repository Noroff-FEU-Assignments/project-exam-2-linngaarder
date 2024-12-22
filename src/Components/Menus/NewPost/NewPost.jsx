import React, { useContext } from "react";
import { Modal } from "react-bootstrap";
import { postsUrl } from "../../../Constants/Apis";
import ShowNewPostContext from "../../../Context/ShowNewPostContext";
import CreatePostForm from "../../Forms/CreatePostForm/CreatePostForm";
import "./newpost.style.scss";

function NewPost() {
  const [showNewPost, setShowNewPost] = useContext(ShowNewPostContext);
  function closeNewPost() {
    setShowNewPost(false);
  }

  return (
    <Modal
      className="new-post full-width"
      show={showNewPost}
      onHide={closeNewPost}
    >
      <CreatePostForm url={postsUrl} close={closeNewPost} />
    </Modal>
  );
}

export default NewPost;
