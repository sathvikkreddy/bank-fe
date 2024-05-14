import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Appbar from "../components/Appbar";
const Index = (props) => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("authorization");
    if (!token) navigate("/signin");
  }, []);

  return (
    <div className="flex w-full h-screen">
      <div className="flex-none fixed top-0 left-0 h-full">
        <Appbar />
      </div>
      <div className="flex-auto ml-[178px] overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Index;
