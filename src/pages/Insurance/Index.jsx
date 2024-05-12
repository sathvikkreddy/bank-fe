import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";

const Insurance = () => {
  const navigate = useNavigate();
  return (
    <div>
      Insurance
      <Button
        title={"Insurance"}
        onClick={() => {
          navigate("/insurance/personal");
        }}
      />
    </div>
  );
};

export default Insurance;
