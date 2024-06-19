import React from "react";
import Notifications from "./Notifications";
import ModeToggle from "./ModeToggle";

const PageTitle = (props) => {
  return (
    <div className="h-16 flex justify-between border-b dark:border-b-gray-600 shadow-md dark:shadow-slate-600 dark:bg-gray-800 dark:text-white">
      <div className="text-3xl font-light flex flex-col justify-center p-2">
        {props.title}
      </div>
      <div className="flex flex-col justify-center pr-6">
        <div className="flex max-h-10 gap-4">
          <div className="flex flex-col justify-center">Mode:</div>
          <div className="flex flex-col justify-center">
            <ModeToggle />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageTitle;
