import React from "react";
import SearchBar from "./SearchBar";
import Notifications from "./Notifications";

const PageTitle = (props) => {
  return (
    <div className="h-16 flex justify-between border-b-1 shadow-md">
      <div className="text-3xl font-light flex flex-col justify-center p-2">{props.title}</div>
      <div className="flex flex-col justify-center pr-6">
        <Notifications />
      </div>
    </div>
  );
};

export default PageTitle;
