import React from "react";

const Button = ({ onClick, loading, title, loadingTitle, className }) => {
  const isLoading = loading || false;
  const lTitle = loadingTitle || title;
  return (
    <button disabled={isLoading} onClick={onClick} className={`w-full flex justify-center text-nowrap py-2 px-4 border border-transparent rounded-md bg-black cursor-${isLoading ? "not-allowed" : "pointer"} shadow-sm text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black ${className}`}>
      {isLoading ? lTitle : title}
    </button>
  );
};

export default Button;
