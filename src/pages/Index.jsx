import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Appbar from "../components/Appbar";
const Index = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // send request to /me api endpoint and set the signedIn accordingly
    // const token = localStorage.getItem("token")
    // const headers = {
    //   "Authorization": token,
    //   "Content-Type": "application/json",
    // };
    // axios.get("http://localhost:3000/me", { headers }).then((res) => {
    //   let signedIn =false
    //   if(res.status === 200) signedIn = true;
    //   if (!signedIn) {
    //     navigate("/signin");
    //   }
    // });

    //hard code
    const signedIn = true;
    if (!signedIn) {
      navigate("/signin");
    }
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
