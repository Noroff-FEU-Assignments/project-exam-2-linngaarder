import React from "react";
import PropTypes from "prop-types";
import { postsUrl } from "../../../Constants/Apis";
import useGet from "../../../Hooks/UseGet";
import Post from "../Post/Post";
import InteractionPanel from "../PostInterface/InteractionPanel/InteractionPanel";
import DisplayResponseErrors from "../../Messages/DisplayResponseError";

function PostDetail({ postID, setShow }) {
  const settings = {
    url: postsUrl + `/${postID}?_author=true&_comments=true&_reactions=true`,
  };

  const { data, loading, error } = useGet(settings);

  function closePost() {
    setShow(false);
  }

  return (
    <>
      {loading && <>Loading</>}
      {data && (
        <>
          <Post data={data} close={closePost} isOpen={true}>
            <InteractionPanel data={data} />
          </Post>
          <button className="mt-2 distinct" onClick={closePost}>
            Close
          </button>
        </>
      )}
      {error && (
        <>
          <DisplayResponseErrors data={error.response.data.errors} />
          <button className="mt-2 distinct" onClick={closePost}>
            Close
          </button>
        </>
      )}
    </>
  );
}

PostDetail.propTypes = {
  postID: PropTypes.number.isRequired,
  setShow: PropTypes.func.isRequired,
};

export default PostDetail;
