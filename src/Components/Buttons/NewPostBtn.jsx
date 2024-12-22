import React, { useContext } from "react";
import ShowNewPostContext from "../../Context/ShowNewPostContext";
import PostButton from "./PostBtn";
import featherIcon from "../../assets/icon/feather-icon.svg";

function NewPostButton() {
  // eslint-disable-next-line no-unused-vars
  const [showNewPost, setShowNewPost] = useContext(ShowNewPostContext);

  function openNewPost() {
    setShowNewPost(true);
  }
  return (
    <>
      <PostButton
        onClick={openNewPost}
        className="new-post-button"
        value="new post"
      >
        <img src={featherIcon} alt="feather-icon" />
        Post
      </PostButton>
    </>
  );
}

export default NewPostButton;
