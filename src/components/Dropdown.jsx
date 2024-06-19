import React, { useState } from "react";

const Dropdown = ({ options, setSelectedAccount }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(options[0].accountName);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelected(option.accountName);
    setSelectedAccount(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        className="w-full flex justify-between "
        id="options-menu"
        aria-expanded="true"
        aria-haspopup="true"
        onClick={toggleDropdown}
      >
        <div>{selected}</div>
        <svg
          className="-mr-1 ml-2 h-7 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black dark:ring-white ring-opacity-5 focus:outline-none dark:bg-gray-800"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div className="py-1" role="none">
            {options.map((option, index) => (
              <button
                key={index}
                className="w-full text-left text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                role="menuitem"
                onClick={() => handleOptionClick(option)}
              >
                {option.accountName}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
