import React, { useEffect, useState } from "react";
import useGet from "../../../Hooks/UseGet";
import SetApiOffset from "../../Utilities/SetApiOffset/SetApiOffset";
import PropTypes from "prop-types";
import PostDetail from "../PostDetail/PostDetail";
import PostListItem from "../PostListItem/PostListItem";
import Message from "../../Messages/Message";
import { useLocation } from "react-router-dom";
import "./displayallposts.style.scss";

function DisplayAllPosts({ settings, feed }) {
  const rateLimit = 25;
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    setOffset(0);
  }, [feed]);

  const [url, setUrl] = useState(
    settings.url + `&limit=${rateLimit}&offset=${offset}`
  );

  const [limitReached, setLimitReached] = useState(false);

  useEffect(() => {
    setUrl(settings.url + `&limit=${rateLimit}&offset=${offset}`);
  }, [offset, settings.url]);

  const { data, loading, error } = useGet({ url: url });

  const [showSingle, setShowSingle] = useState(false);

  useEffect(() => {
    if (data && data.length < rateLimit) {
      setLimitReached(true);
    } else {
      setLimitReached(false);
    }
  }, [data]);

  const location = useLocation();
  useEffect(() => {
    setShowSingle(false);
  }, [location]);

  return (
    <div
      id="posts-display"
      className="flex-col justify-start align-center full-width full-height"
    >
      {loading && <>Loading</>}
      {error && <Message type="error">{error.toString()}</Message>}

      {data &&
        !loading &&
        (showSingle && showSingle.id ? (
          <PostDetail postID={showSingle.id} setShow={setShowSingle} />
        ) : (
          <div className="flex-col wrap align-center full-width">
            <ul className="post-list flex-col align-center gap-lg full-width standard-component-width">
              <SetApiOffset
                limit={rateLimit}
                handleOffset={setOffset}
                offset={offset}
                limitReached={limitReached}
              />
              {data.map((post) => {
                return (
                  <PostListItem
                    data={post}
                    id={post.id}
                    key={post.id}
                    showSingle={setShowSingle}
                  />
                );
              })}
              <SetApiOffset
                limit={rateLimit}
                handleOffset={setOffset}
                offset={offset}
                limitReached={limitReached}
              />
              {limitReached && <div>No more posts to show</div>}
            </ul>
          </div>
        ))}
    </div>
  );
}

DisplayAllPosts.propTypes = {
  settings: PropTypes.object.isRequired,
  feed: PropTypes.string,
};

export default DisplayAllPosts;
