import React from "react";
import SearchBar from "./SearchBar";

const PageTitle = (props) => {
  return (
    <div className="h-16 flex justify-between border-b-2">
      <div className="text-xl font-semibold flex flex-col justify-center p-2">
        {props.title}
      </div>
      <SearchBar />
    </div>
  );
};

export default PageTitle;
