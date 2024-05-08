import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center gap-1">
      404 Page Not Found
      <Link to={"/"} className="text-blue-500 underline">
        go to homepage
      </Link>
    </div>
  );
};

export default NotFound;
