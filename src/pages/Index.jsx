import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Appbar from "../components/Appbar";
import axios from "axios";
import LoanIndex from "./Loan/Index";
import BillIndex from "./Bill/Index";
import TransactionsIndex from "./Transaction/Index";
import InsuranceIndex from "./Insurance/Index";
import ProfileIndex from "./Profile/Index";
import HomeIndex from "./Home/Index";
import Card from "../components/Card";
import NotFound from "./NotFound";

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
      <div className="flex-auto ml-[174px] overflow-y-auto">
        <Routes>
          <Route path="/" element={<HomeIndex />} />
          <Route path="/transactions" element={<TransactionsIndex />} />
          <Route path="/insurance" element={<InsuranceIndex />} />
          <Route path="/bills" element={<BillIndex />} />
          <Route path="/loan" element={<LoanIndex />} />
          <Route path="/profile" element={<ProfileIndex />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
};

export default Index;
