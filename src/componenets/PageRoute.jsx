import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

// Components
import Navbbar from "./Navbbar";

// Pages

import LoginPage from "../pages/LoginPage";
import Register from "../pages/Register";
import UserProfile from "../pages/UserProfile";
import AddMenuItem from "../pages/menuPage/AddMenuItem";
import MenuList from "../pages/menuPage/MenuList";
import MenuUpdate from "../pages/menuPage/MenuUpdate";
import Menu from "../pages/menuPage/Menu";
import PlaceOrderComponent from "./PlaceOrderComponent";
import Home from "../pages/Home";
import MyOrder from "./MyOrder";

function PageRoute() {
  const user = useSelector((state) => state.user.user);

  return (
    <>
      <Navbbar />
      <Routes>
        {/* Public Routes */}
       
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Menu />} />
        <Route path="/place-order" element={<PlaceOrderComponent />} />
        <Route path="/order" element={<MyOrder />} />

        {/* Protected Routes */}
        {user && (
          <>
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/addmenu" element={<AddMenuItem />} />
            <Route path="/menulist" element={<MenuList />} />
            <Route path="/menu-update/:id" element={<MenuUpdate />} />
          </>
        )}
      </Routes>
    </>
  );
}

export default PageRoute;
