import React, { useState } from "react";
import { Link } from "react-router-dom";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const notifications = [
    { title: "Transaction Alert", text: "A withdrawal of $500 has been made from your account ending in 1234." },
    { title: "Deposit Received", text: "Your paycheck of $2,000 has been deposited into your account ending in 5678." },
    { title: "Low Balance Warning", text: "Your account balance is below $100. Please deposit funds to avoid fees." },
    { title: "Payment Due", text: "Your credit card payment of $250 is due on May 25, 2024." },
    { title: "Account Update", text: "Your personal information has been successfully updated." },
    { title: "Fraud Alert", text: "Suspicious activity detected in your account. Please contact customer service." },
    { title: "Loan Approval", text: "Congratulations! Your loan application has been approved." },
    { title: "Interest Earned", text: "You have earned $15.75 in interest on your savings account." },
    { title: "New Statement Available", text: "Your monthly statement for April 2024 is now available." },
    { title: "Service Notification", text: "Scheduled maintenance will occur on May 20, 2024. Online banking will be unavailable from 1 AM to 3 AM." },
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button type="button" className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900" aria-expanded={isOpen} onClick={toggleDropdown}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-[42rem]">
          <div className="w-full flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
            <div className="text-lg font-semibold py-3 flex justify-center border-b">Notifications</div>
            <div className="px-4">
              {notifications.slice(0, 5).map((notification, index) => {
                return (
                  <div key={index}>
                    <NotificationItem notification={notification} />
                  </div>
                );
              })}
            </div>
            <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50 border-t">
              <Link to="/notifications" className="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-gray-900 hover:bg-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                </svg>
                See all
              </Link>
              <a href="#" className="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-gray-900 hover:bg-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
                Clear
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;

const NotificationItem = ({ notification }) => {
  const title = notification.title;
  const text = notification.text;
  return (
    <div className="group relative rounded-lg p-3 m-2 bg-gray-50 hover:bg-gray-100">
      <div className="font-semibold text-lg">{notification.title}</div>
      <div>{notification.text}</div>
    </div>
  );
};
