import React from "react";
import SearchBar from "./SearchBar";

const PageTitle = (props) => {
  return (
    <div className="h-16 flex justify-between border-b-1 shadow-md">
      <div className="text-3xl font-light flex flex-col justify-center p-2">
        {props.title}
      </div>
      <SearchBar />
    </div>
  );
};

export default PageTitle;
