import React from "react";

const Button = ({ onClick, loading, title, loadingTitle, className }) => {
  const isLoading = loading || false;
  const lTitle = loadingTitle || title;
  return (
    <button
      disabled={isLoading}
      onClick={onClick}
      className={`w-full flex justify-center text-nowrap py-2 px-4 border border-transparent rounded-md bg-c300 dark:bg-c700 cursor-${
        isLoading ? "not-allowed" : "pointer"
      } shadow-sm text-sm font-medium dark:text-white hover:bg-c400 dark:hover:bg-c600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black ${className}`}
    >
      {isLoading ? lTitle : title}
    </button>
  );
};

export default Button;
