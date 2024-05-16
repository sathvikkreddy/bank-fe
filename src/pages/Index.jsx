import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Appbar from "../components/Appbar";
import { fetchUserDetails } from "../utils/fetchUserDetails";
import { fetchUserTransactions } from "../utils/fetchUserTransactions";
const Index = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("authorization");
    if (!token) navigate("/signin");
    else {
      fetchUserDetails().then((profile) => {
        setProfile(profile);
        fetchUserTransactions().then((transactions) => {
          setTransactions(transactions);
          setIsLoading(false);
        });
      });
    }
  }, []);

  return (
    <div className="flex w-full h-screen">
      <div className="flex-none fixed top-0 left-0 h-full">
        <Appbar />
      </div>
      <div className="flex-auto ml-[178px] overflow-y-auto">{isLoading ? <div>loading</div> : <Outlet context={[profile, isLoading, transactions]} />}</div>
    </div>
  );
};

export default Index;
