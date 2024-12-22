import React from "react";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { postsUrl } from "../../../../../Constants/Apis";
import CreatePostForm from "../../../../Forms/CreatePostForm/CreatePostForm";

function EditPost({ post, auth }) {
  const [show, setShow] = useState(false);
  const url = postsUrl + `/${post.id}`;
  function showEdit() {
    setShow(!show);
  }
  return (
    <>
      <button className="system-btn" onClick={showEdit}>
        Edit
      </button>
      {show && (
        <div className="flex-col align-center full-width">
          <Modal
            show={show}
            onHide={showEdit}
            className="full-width standard-component-width p-3"
          >
            <CreatePostForm
              url={url}
              edit={post}
              close={showEdit}
              postBodyId="edit-post-body"
            />
          </Modal>
        </div>
      )}
    </>
  );
}

export default EditPost;
