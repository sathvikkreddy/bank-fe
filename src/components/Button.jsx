import React from "react";

const Button = ({ onClick, loading, title, loadingTitle, className }) => {
  const isLoading = loading || false;
  return (
    <div onClick={onClick} className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md bg-black cursor-${isLoading ? "not-allowed" : "pointer"} shadow-sm text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black ${className}`}>
      {isLoading ? loadingTitle : title}
    </div>
  );
};

export default Button;
