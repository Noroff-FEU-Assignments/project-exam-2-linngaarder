import React from "react";
import { useState } from "react";
import HomeLayout from "../../Components/Layout/HomeLayout/HomeLayout";
import MainLayout from "../../Components/Layout/MainLayout/MainLayout";
import DisplayAllPosts from "../../Components/Posts/DisplayAllPosts/DisplayAllPosts";
import { postsUrl } from "../../Constants/Apis";
import NewPost from "../../Components/Menus/NewPost/NewPost";

function Home() {
  // eslint-disable-next-line no-unused-vars
  const [urlSettings, setUrlSettings] = useState({
    url: `${postsUrl}?_author=true&_reactions=true`,
  });

  return (
    <MainLayout>
      <HomeLayout>
        <NewPost />
        <DisplayAllPosts settings={urlSettings} />
      </HomeLayout>
    </MainLayout>
  );
}

export default Home;
