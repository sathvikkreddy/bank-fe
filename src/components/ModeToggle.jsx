import React, { useState } from "react";

const ModeToggle = () => {
  const [dark, setDark] = React.useState(
    document.documentElement.classList.contains("dark")
  );

  const darkModeHandler = () => {
    setDark(!dark);
    if (!dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div
        className={`w-16 h-8 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer transition-colors duration-300`}
        onClick={darkModeHandler}
      >
        <div
          className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 dark:bg-gray-900 dark:text-white ${
            dark ? "translate-x-8" : "translate-x-0"
          }`}
        >
          {!dark ? <LightModeIcon /> : <DarkModeIcon />}
        </div>
      </div>
    </div>
  );
};

function LightModeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      className="size-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
      />
    </svg>
  );
}

function DarkModeIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      className="size-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
      />
    </svg>
  );
}

export default ModeToggle;
