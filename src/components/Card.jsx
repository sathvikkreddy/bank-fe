import React from "react";

const Card = (props) => {
  return (
    <div className="h-full w-full flex-cols">
      <div className="h-1/6 max-h-16 border-b-2 text-xl font-semibold flex flex-col justify-center p-2">
        {props.title}
      </div>
      <div className="h-full">{props.children}</div>
    </div>
  );
};

export default Card;
