import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const mode = localStorage.getItem("mode") || "dark";
  const dark = mode === "dark";

  return (
    <div
      className={`h-screen w-full flex flex-col justify-center items-center gap-1 ${
        dark ? "bg-c950 text-white" : "bg-c100 "
      }`}
    >
      404 Page Not Found
      <Link to={"/"} className="text-c500 underline">
        go to homepage
      </Link>
    </div>
  );
};

export default NotFound;
