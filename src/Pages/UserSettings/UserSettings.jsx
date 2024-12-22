import React from "react";
import { useParams } from "react-router-dom";
import HomeLayout from "../../Components/Layout/HomeLayout/HomeLayout";
import MainLayout from "../../Components/Layout/MainLayout/MainLayout";
import UpdateProfileImageMenu from "../../Components/Menus/UpdateProfileImage/UpdateProfileImageMenu";
import NewPost from "../../Components/Menus/NewPost/NewPost";
import DisplayResponseErrors from "../../Components/Messages/DisplayResponseError";
import UserBanner from "../../Components/User/UserBanner/UserBanner";
import { userUrl } from "../../Constants/Apis";
import useGet from "../../Hooks/UseGet";

function UserSettings() {
  const { name } = useParams();

  const usernameUrl = {
    url: userUrl + `/${name}`,
  };
  const { data, loading, error } = useGet(usernameUrl);

  return (
    <MainLayout>
      <HomeLayout>
        <NewPost />

        {loading && <>Loading...</>}
        {data && (
          <>
            <UserBanner user={data} />
            <UpdateProfileImageMenu user={data} />
          </>
        )}
        {error && <DisplayResponseErrors data={error.response.data.errors} />}
      </HomeLayout>
    </MainLayout>
  );
}

export default UserSettings;
