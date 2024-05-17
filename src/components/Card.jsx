import React from "react";

const Card = (props) => {
  return (
    <div className="h-full border rounded-md w-full flex-cols shadow-xl">
      <div className="h-1/6 min-h-12 border-b shadow-md shadow-slate-100 text-xl font-semibold flex flex-col justify-center p-2">{props.title}</div>
      <div className="pb-3 pt-2 px-2 h-5/6">{props.children}</div>
    </div>
  );
};

export default Card;
