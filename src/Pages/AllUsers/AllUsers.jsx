import React from "react";
import HomeLayout from "../../Components/Layout/HomeLayout/HomeLayout";
import MainLayout from "../../Components/Layout/MainLayout/MainLayout";
import NewPost from "../../Components/Menus/NewPost/NewPost";
import Heading from "../../Components/Typography/Heading";
import UserList from "../../Components/User/UserList/UserList";

function AllUsers() {

  return (
    <MainLayout>
      <HomeLayout>
        <NewPost />
        <Heading>All users</Heading>
        <UserList />
      </HomeLayout>
    </MainLayout>
  );
}

export default AllUsers;
