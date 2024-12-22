import React, { useState } from "react";
import { useParams } from "react-router-dom";
import HomeLayout from "../../Components/Layout/HomeLayout/HomeLayout";
import MainLayout from "../../Components/Layout/MainLayout/MainLayout";
import PatronList from "../../Components/Menus/PatronList/PatronList";
import NewPost from "../../Components/Menus/NewPost/NewPost";
import DisplayResponseErrors from "../../Components/Messages/DisplayResponseError";
import DisplayAllPosts from "../../Components/Posts/DisplayAllPosts/DisplayAllPosts";
import UserBanner from "../../Components/User/UserBanner/UserBanner";
import ScrollToTop from "../../Components/Utilities/ScrollToTop/ScrollToTop";
import { userUrl } from "../../Constants/Apis";
import useGet from "../../Hooks/UseGet";

function UserPage() {
  const { name } = useParams();

  const getUserSettings = {
    url: `${userUrl}/${name}?_following=true&_followers=true`,
  };
  const getPostsSettings = {
    url: `${userUrl}/${name}/posts?_author=true&_reactions=true`,
  };

  const { data, loading, error } = useGet(getUserSettings);

  const [showSocial, setShowSocial] = useState(false);
  const handleShowSocial = () => setShowSocial(!showSocial);
  const [socialSet, setSocialSet] = useState();
  const handleSocialSet = (set) => {
    setSocialSet(set);
  };

  return (
    <ScrollToTop>
      <MainLayout>
        <HomeLayout>
          <NewPost />
          {data && (
            <>
              <UserBanner
                user={data}
                handleShowSocial={handleShowSocial}
                handleSocialSet={handleSocialSet}
              />
              {showSocial && socialSet && (
                <PatronList patrons={socialSet} handleShow={handleShowSocial} />
              )}
              <DisplayAllPosts settings={getPostsSettings} />
            </>
          )}
          {loading && <>Loading</>}
          {error && <DisplayResponseErrors data={error.response.data.errors} />}
        </HomeLayout>
      </MainLayout>
    </ScrollToTop>
  );
}

export default UserPage;
