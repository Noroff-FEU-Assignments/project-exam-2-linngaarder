import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { postsUrl } from "../../../../../Constants/Apis";
import createAxios from "../../../../../Functions/CreateAxios";
import RefreshContext from "../../../../../Context/RefreshContext";
import { Button, Modal } from "react-bootstrap";

function DeletePost({ id, auth, close }) {
  const [refresh, setRefresh] = useContext(RefreshContext);
  const [showConfirm, setShowConfirm] = useState(false);
  const handleShowConfirm = () => setShowConfirm(!showConfirm);
  async function doDelete() {
    try {
      const url = postsUrl + "/" + id;
      const client = createAxios(auth);

      await client.delete(url);
      if (close) {
        close();
      }
      setRefresh(!refresh);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <>
      <button className="system-btn" onClick={handleShowConfirm}>
        delete post
      </button>
      <Modal show={showConfirm} onHide={handleShowConfirm}>
        <Modal.Body className="p-3 flex-col align-center full-width gap-sm">
          Are you sure you want to delete this post?
          <div className="flex-r full-width justify-between">
            <Button variant="danger" onClick={doDelete}>
              Yes, delete it
            </Button>
            <Button variant="secondary" onClick={handleShowConfirm}>
              No, keep it
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

DeletePost.propTypes = {
  id: PropTypes.number.isRequired,
  auth: PropTypes.object.isRequired,
  close: PropTypes.func,
};

export default DeletePost;
