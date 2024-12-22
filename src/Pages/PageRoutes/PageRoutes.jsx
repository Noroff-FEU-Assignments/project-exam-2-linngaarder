import React from "react";
import { Route, Routes } from "react-router-dom";
import AllUsers from "../AllUsers/AllUsers";
import IntroPage from "../IntroPage/IntroPage";
import Home from "../Home/Home";
import Login from "../Login/Login";
import Register from "../Register/Register";
import UserPage from "../UserPage/UserPage";
import UserSettings from "../UserSettings/UserSettings";
import ScrollToTop from "../../Components/Utilities/ScrollToTop/ScrollToTop";

function PageRoutes() {
  return (
    <ScrollToTop>
      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user/:name" element={<UserPage />} />
        <Route path="/user/:name/settings" element={<UserSettings />} />
        <Route path="/users" element={<AllUsers />} />
      </Routes>
    </ScrollToTop>
  );
}

export default PageRoutes;
