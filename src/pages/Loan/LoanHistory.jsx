import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import Card from "../../components/Card";
const LoanHistory = () => {
  const [profile] = useOutletContext();
  const [emp, setEmp] = useState(" ");
  const formatNumber = (number) => {
    return number.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <div className="container p-8">
      <h1 className="flex text-2xl font-bold mb-4 text-c300">Active Loans</h1>

      <div className="">
        {profile.loans.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {profile.loans.map((loan) => (
              <div
                key={loan.loanDetailsId}
                className="p-4 border dark:border-teal-300 rounded shadow-md dark:shadow-slate-700 hover:bg-teal-100 dark:hover:bg-c700"
              >
                <Link to={`LoanDetails/${loan.loanDetailsId}`}>
                  <div >
                    <div className="flex justify-center">
                      <strong>
                        <p>{loan.loanType}</p>
                      </strong>
                    </div>
                    <hr className="shadow-md group-hover:shadow-teal-300 border-black dark:border-teal-300"/>
                    <br />
                    <div className="font-semibold sm:text-base text-xs">
                      Account ID :{" "}
                      <span className="font-normal">{loan.accountId}</span>
                    </div>
                    <div className="font-semibold sm:text-base text-xs">
                      Loan Amount:{" "}
                      <span className="font-normal">
                        ₹{formatNumber(loan.loanAmount)}
                      </span>
                    </div>
                    <div className="font-semibold sm:text-base text-xs">
                      Tenure:{" "}
                      <span className="font-normal">{loan.tenure} Months</span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p>Apply From Below</p>
        )}
      </div>
    </div>
  );
};

export default LoanHistory;
