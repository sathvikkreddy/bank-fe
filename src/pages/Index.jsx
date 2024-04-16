import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Appbar from "../components/Appbar";

const Index = () => {
  const navigate = useNavigate();
  useEffect(() => {
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
        <Route path="/loan" element={<div>Loan</div>} />
      </Routes>
    </div>
  );
};

export default Index;
