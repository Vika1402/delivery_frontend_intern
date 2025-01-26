import React from "react";

import PageRoute from "./componenets/PageRoute";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import toast, { Toaster } from "react-hot-toast";
import { loginUser } from "./redux/userRedux/user.action.js";

function App() {
  return (
    <div className="h-[100vh] text-white items-center justify-center ">
      {" "}
      <Toaster />
      <div className="h-[100vh] bg-gray-800 xl:px-12 lg:px-6 px-3">
        <PageRoute />
      </div>
    </div>
  );
}

export default App;
