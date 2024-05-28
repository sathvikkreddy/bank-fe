import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Appbar from "../components/Appbar";
import updateOutletContext from "../utils/updateOutletContext";
import LoadingSpinner from "../components/LoadingSpinner";

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
      updateOutletContext(setProfile, setTransactions, setIsLoading);
    }
  }, []);
  return (
    <div className="flex w-full h-screen">
      <div className="flex-none fixed top-0 left-0 h-full">
        <Appbar />
      </div>
      <div className="flex-auto ml-[190px] overflow-y-auto">
        {isLoading ? (
          <div className="h-screen flex justify-center items-center">
            <LoadingSpinner />
          </div>
        ) : (
          <Outlet context={[profile, isLoading, transactions, setProfile, setIsLoading, setTransactions]} />
        )}
      </div>
    </div>
  );
};

export default Index;
