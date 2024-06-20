import React from "react";

const Card = (props) => {
  return (
    <div className="h-full border dark:border-gray-600 rounded-md w-full flex-cols shadow-xl shadow-teal-100 dark:shadow-md dark:shadow-teal-600">
      <div className="text-light h-1/6 min-h-10 max-h-14 border-b dark:border-b-c600 shadow-md shadow-teal-100 dark:shadow-slate-700 text-xl font-semibold flex flex-col justify-center p-2">
        {props.title}
      </div>
      <div className="p-2 h-5/6 min-h-40 overflow-auto">{props.children}</div>
    </div>
  );
};

export default Card;
