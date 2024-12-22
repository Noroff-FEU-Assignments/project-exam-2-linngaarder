import React from "react";
import { useParams } from "react-router-dom";
import MainLayout from "../../Components/Layout/MainLayout/MainLayout";
import DisplayResponseErrors from "../../Components/Message/display-response-errors";
import Post from "../../Components/Posts/post";
import InteractionPanel from "../../Components/Posts/PostInteraction/InteractionPanel/InteractionPanel";
import { postsUrl } from "../../Constants";
import useGet from "../../Hooks/use-get";
import HomeLayout from "../../Components/Layout/HomeLayout/HomeLayout";

function SinglePost() {
  const { id } = useParams();

  const singlePostUrlSettings = {
    url: `${postsUrl}/${id}?_author=true&_comments=true&_reactions=true`,
  };

  const { data, loading, error } = useGet(singlePostUrlSettings);

  return (
    <MainLayout>
      <HomeLayout>
        <div className="post-container p-5">
          {data && (
            <Post data={data}>
              <InteractionPanel data={data} />
            </Post>
          )}
          {loading && <>Loading</>}
          {error && <DisplayResponseErrors data={error.response.data.errors} />}
        </div>
      </HomeLayout>
    </MainLayout>
  );
}

export default SinglePost;
