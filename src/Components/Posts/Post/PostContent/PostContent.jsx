import React, { useState } from "react";
import PropTypes from "prop-types";
import validImageUrl from "../../../../Functions/ValidImageUrl";
import imageError from "../../../../assets/imageerror.png";
import { useEffect } from "react";
import PostHeader from "../PostHeader/PostHeader";
import "./postcontent.style.scss";

function PostContent({ data, isOwner = false, handleShow, close }) {
  const [validMedia, setValidMedia] = useState(true);

  useEffect(() => {
    async function checkMedia() {
      if (data.media) {
        setValidMedia(await validImageUrl(data.media));
      }
    }
    checkMedia();
  });

  return (
    <div className={`post-content p-3 flex-col gap-sm`}>
      <PostHeader data={data} isOwner={isOwner} close={close} />
      <div className="post-main flex-col align-self-center full-width smaller-component-width gap-xs">
        <div className="align-self-start">
          {handleShow ? (
            <div className="show-interact" onClick={handleShow}>
              <span className="post-title align-self-start">{data.title}</span>
            </div>
          ) : (
            <span className="post-title align-self-start">{data.title}</span>
          )}
        </div>
        <div className="post-body flex-col full-width gap-sm">
          {data.body && <p>{data.body}</p>}
          {data.media && (
            <div className="post-image flex-col align-center full-width">
              <img
                src={validMedia ? data.media : imageError}
                alt={data.title}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

PostContent.propTypes = {
  data: PropTypes.object.isRequired,
  isOwner: PropTypes.bool.isRequired,
  handleShow: PropTypes.func,
  close: PropTypes.func,
};

export default PostContent;
