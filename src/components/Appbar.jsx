import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ModeToggle from "./ModeToggle";

export default function Appbar() {
  const navigate = useNavigate();
  const AppbarItems = [
    { title: "Loan", to: "loan", icon: <LoanIcon className="w-4 h-4" /> },
    {
      title: "Insurance",
      to: "insurance",
      icon: <InsuranceIcon className="w-4 h-4" />,
    },
    {
      title: "Transactions",
      to: "transactions",
      icon: <TransactionsIcon className="w-4 h-4" />,
    },
    { title: "Bills", to: "bills", icon: <BillsIcon className="w-4 h-4" /> },
    {
      title: "Settings",
      to: "settings",
      icon: <SettingsIcon className="w-4 h-4" />,
    },
  ];

  const [selectedItem, setSelectedItem] = useState("");

  const handleItemClick = (item) => {
    setSelectedItem(item.to); // Use 'to' as a unique identifier
  };

  return (
    <div className="flex flex-col h-full justify-between border-r dark:border-r-gray-600 shadow-md shadow-c100 dark:shadow-c700 dark:text-white">
      <div className="flex flex-col sm:px-4 gap-4 top-0 z-50 mx-1 sm:m-0">
        <div
          className={`flex text-lg ${
            selectedItem === "" ? "bg-c400 dark:bg-c700" : ""
          } sm:p-3 p-2 mt-3 cursor-pointer rounded-md sm:border dark:border-gray-700`}
          onClick={() => {
            setSelectedItem("");
            navigate("/");
          }}
        >
          <HomeIcon className="w-4 h-4 block sm:hidden" />
          <div className="hidden sm:block">The Bank App</div>
        </div>
        {AppbarItems.map((item, index) => {
          return (
            <div key={item.to} onClick={() => handleItemClick(item)}>
              {<AppbarItem item={item} selected={selectedItem === item.to} />}
            </div>
          );
        })}
        <div className="flex max-h-10 sm:gap-4 sm:p-2">
          <div className="flex-col justify-center hidden sm:flex">Mode:</div>
          <div className="flex flex-col sm:justify-center transform sm:rotate-0 rotate-90">
            <ModeToggle />
          </div>
        </div>
      </div>
      <div
        className={`flex sm:m-2 sm:p-2 cursor-pointer rounded-md ${
          selectedItem === "profile" ? "bg-c400 dark:bg-c700" : ""
        }`}
        onClick={() => {
          setSelectedItem("profile");
          navigate("/profile");
        }}
      >
        <div
          className="rounded-full flex items-center sm:pr-2 pl-2 pr-1 py-1"
          size="icon"
          variant="ghost"
        >
          <ProfileIcon className="w-5 h-5" />
        </div>
        <div className="text-lg hidden sm:block">Profile</div>
      </div>
    </div>
  );
}

function ProfileIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
      />
    </svg>
  );
}

function HomeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
      />
    </svg>
  );
}

function TransactionsIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
      />
    </svg>
  );
}

function BillsIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
      />
    </svg>
  );
}

function InsuranceIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 12a10.06 10.06 1 0 0-20 0Z" />
      <path d="M12 12v8a2 2 0 0 0 4 0" />
      <path d="M12 2v1" />
    </svg>
  );
}

function LoanIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
      <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
      <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
    </svg>
  );
}

function SettingsIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
      <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
  );
}

const AppbarItem = ({ item, selected }) => {
  const navigate = useNavigate();
  const { title, icon, to } = item;
  return (
    <div
      className={`flex items-center ${
        selected ? "bg-c300 dark:bg-teal-700" : ""
      } sm:p-2 py-2 px-2 rounded-md gap-2 text-lg cursor-pointer`}
      onClick={() => {
        navigate(`/${to}`);
      }}
    >
      {icon}
      <span className="hidden sm:block">{title}</span>
    </div>
  );
};
