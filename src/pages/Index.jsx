import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Appbar from "../components/Appbar";
import axios from "axios";
import Loan from "./Loan";
import Bills from "./Bills";
import Transfer from "./Transfer";
import Transactions from "./Transactions";
import Insurance from "./Insurance";
import Profile from "./Profile";

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
    <div>
      <Appbar />
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/insurance" element={<Insurance />} />
        <Route path="/transfer" element={<Transfer />} />
        <Route path="/bills" element={<Bills />} />
        <Route path="/loan" element={<Loan />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
};

export default Index;
