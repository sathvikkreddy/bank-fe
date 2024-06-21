import React, { useState, useEffect, useRef } from "react";
import { useOutletContext } from "react-router-dom";
import PageTitle from "../../components/PageTitle";

const Personalloan = () => {
  const [loanDetails, setLoanDetails] = useState([]);
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [roi, setRoi] = useState(null);
  const [tenureOptions, setTenureOptions] = useState([]);
  const [selectedTenure, setSelectedTenure] = useState("");
  const [enteredAmount, setEnteredAmount] = useState("");
  const [emi, setEmi] = useState(null);
  const [pin, setPin] = useState("");
  const [accountId, setAccountId] = useState("");
  const [accounts, setAccounts] = useState([]);
  const [previousAmount, setPreviousAmount] = useState(null);
  const [message, setMessage] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [valid, setValid] = useState(true);
  const [profile] = useOutletContext();

  const tenureRef = useRef(null);
  const amountRef = useRef(null);
  const accountRef = useRef(null);
  const pinRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("authorization");
    const fetchData = async () => {
      try {
        const loanType = "Personal Loan";
        const url = `https://techbuzzers.somee.com/GetLoanDetails?loanType=${loanType}`;

        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setLoanDetails(data);
      } catch (error) {
        console.error("Fetching error:", error);
      }
    };

    const fetchAccounts = async () => {
      try {
        const url = `https://techbuzzers.somee.com/GetBankAccounts`;

        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setAccounts(data);
      } catch (error) {
        console.error("Fetching error:", error);
      }
    };

    fetchData();
    fetchAccounts();
  }, []);

  const handleAmountChange = (event) => {
    const selectedId = event.target.value;
    const selectedLoan = loanDetails.find(
      (loan) => loan.loanDetails.id === selectedId
    );
    if (selectedLoan) {
      setSelectedAmount(selectedLoan.loanDetails.amouuntGranted);
      setRoi(selectedLoan.loanDetails.roi);
      setTenureOptions(selectedLoan.tenure);

      // Determine the previous amount
      const amounts = loanDetails
        .map((loan) => loan.loanDetails.amouuntGranted)
        .sort((a, b) => a - b);
      const selectedIndex = amounts.indexOf(
        selectedLoan.loanDetails.amouuntGranted
      );
      const previousAmount = selectedIndex > 0 ? amounts[selectedIndex - 1] : 1; // default to 1 if no previous amount
      setPreviousAmount(previousAmount);
    }
  };

  const formatNumber = (number) => {
    return number.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };
  const handleTenureChange = (event) => {
    setSelectedTenure(event.target.value);
  };

  const handleEmiCalculation = () => {
    if (!selectedTenure) {
      tenureRef.current.focus();
      setMessage("Please select a tenure");
      setShowDialog(true);
      return;
    }

    if (
      enteredAmount <= 0 ||
      enteredAmount < previousAmount ||
      enteredAmount > selectedAmount
    ) {
      setMessage(
        `Please enter an amount between ${formatNumber(
          previousAmount
        )} and ${formatNumber(selectedAmount)}`
      );
      setShowDialog(true);
      return;
    }
    const P = enteredAmount;
    const R = roi / 12 / 100;
    const N = selectedTenure;
    const emiCalc = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    setEmi(emiCalc);
  };

  const handleApplyLoan = async () => {
    const token = localStorage.getItem("authorization");
    const existingPersonalLoan = profile.loans.some(
      (loan) => loan.loanType === "Personal Loan"
    );

    if (!pin) {
      pinRef.current.focus();
      setMessage("Please enter your PIN");
      setShowDialog(true);
      return;
    }

    if (!selectedTenure) {
      tenureRef.current.focus();
      setMessage("Please select a tenure");
      setShowDialog(true);
      return;
    }

    if (
      !enteredAmount ||
      enteredAmount < previousAmount ||
      enteredAmount > selectedAmount
    ) {
      amountRef.current.focus();
      setMessage(
        `Please enter a valid amount between ${formatNumber(
          previousAmount
        )} and ${formatNumber(selectedAmount)}`
      );
      setShowDialog(true);
      return;
    }

    if (!accountId) {
      accountRef.current.focus();
      setMessage("Please select an account");
      setShowDialog(true);
      return;
    }

    if (existingPersonalLoan) {
      setMessage(
        'OOPS! you have "Applied Personal Loan". Request to Apply after its clearance...'
      );
      setShowDialog(true);
      return;
    }

    const selectedLoan = loanDetails.find(
      (loan) => loan.loanDetails.amouuntGranted === selectedAmount
    );
    const loanDetailsId = selectedLoan.loanDetails.id;

    try {
      const response = await fetch("https://techbuzzers.somee.com/ApplyLoan", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          loan: {
            loanDetailsId: loanDetailsId,
            accountId: accountId,
            loanAmount: enteredAmount,
            tenure: selectedTenure,
          },
          pin: pin,
        }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Incorrect PIN");
        } else {
          throw new Error(`Details Not Filled Properly!!\n
          Fill All the Details`);
        }
      }

      setMessage("Loan Applied Successfully");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setShowDialog(true);
    }
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
  };

  const formatAmount = (amount) => {
    if (amount >= 1000000) {
      return `${amount / 1000000} Million`;
    } else if (amount >= 100000) {
      return `${amount / 100000} Lakhs`;
    } else {
      return amount;
    }
  };

  return (
    <div>
      <PageTitle title="Personal Loan" />
      <div className="min-h-screen p-8">
        <h1 className="text-xl font-bold mb-4 text-c400">Personal Loan</h1>
        <div className=" p-6 rounded shadow-md dark:shadow-teal-600">
          <div className="mb-4">
            <label className="block text-sm font-medium ">
              Select Loan Amount Range
            </label>
            <select
              className="mt-1 block w-full py-2 px-3 dark:bg-gray-800 border border-gray-300 dark:border-gray-600  rounded-md shadow-sm dark:shadow-slate-600 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
              onChange={handleAmountChange}
            >
              <option value="">Select an amount</option>
              {loanDetails.map((loan) => (
                <option key={loan.loanDetails.id} value={loan.loanDetails.id}>
                  {formatAmount(loan.loanDetails.amouuntGranted)}
                </option>
              ))}
            </select>
          </div>
          {selectedAmount && (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium ">
                  Rate of Interest
                </label>
                <div className="mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md">
                  {roi}%
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium ">
                  Select Tenure <span className="text-red-600">*</span>
                </label>
                <select
                  ref={tenureRef}
                  className="mt-1 block w-full py-2 px-3 dark:bg-gray-800 border border-gray-300 dark:border-gray-600  rounded-md shadow-sm dark:shadow-slate-600 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                  onChange={handleTenureChange}
                  required
                >
                  <option value="">Select tenure</option>
                  {tenureOptions.map((tenure) => (
                    <option key={tenure} value={tenure}>
                      {tenure} months
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="flex-row block text-sm font-medium ">
                  ( Enter Specific Amount )
                  <span>
                    {valid ? (
                      <span className="flex-row">✅</span>
                    ) : (
                      <span className="text-red-600">
                        {" "}
                        *amount must be in range ₹{previousAmount} and ₹
                        {selectedAmount}
                      </span>
                    )}
                  </span>
                </label>
                <input
                  ref={amountRef}
                  type="number"
                  className="mt-1 block w-full py-2 px-3 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm dark:shadow-slate-600 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                  value={enteredAmount}
                  onChange={(e) => {
                    setEnteredAmount(e.target.value);
                    if (
                      e.target.value < previousAmount ||
                      e.target.value > selectedAmount
                    ) {
                      setValid(false);
                    } else {
                      setValid(true);
                    }
                  }}
                  required
                />
              </div>
              <div className="mb-4">
                <button
                    className="px-4 py-2 bg-c300 dark:bg-c500 dark:hover:border-teal-300 text-white dark:text-black mt-2 shadow-md p-4 border rounded hover:bg-c400 dark:hover:text-black hover:font-semibold"
                    onClick={handleEmiCalculation}
                >
                  Calculate EMI
                </button>
              </div>
              {emi && (
                <div className="mb-4">
                  <label className="block text-sm font-medium ">
                    Your monthly payable EMI is:
                  </label>
                  <div className="mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md">
                    ₹{formatNumber(emi)}
                  </div>
                </div>
              )}
              <div className="mb-4">
                <label className="block text-sm font-medium ">
                  Select Account ID <span className="text-red-600">*</span>
                </label>
                <select
                  ref={accountRef}
                  className="mt-1 block w-full py-2 px-3 dark:bg-gray-800 border border-gray-300 dark:border-gray-600  rounded-md shadow-sm dark:shadow-slate-600 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                  onChange={(e) => setAccountId(e.target.value)}
                  required
                >
                  <option value="">Select an account</option>
                  {accounts.map((account) => (
                    <option key={account.id} value={account.id}>
                      {account.accountName} - {account.id}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium ">
                  Enter PIN to verify <span className="text-red-600">*</span>
                </label>
                <input
                  ref={pinRef}
                  type="password"
                  className="mt-1 block w-full py-2 px-3 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm dark:shadow-slate-600 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <button
                    className="px-4 py-2 bg-c300 dark:bg-c500 dark:hover:border-teal-300 text-white dark:text-black mt-2 shadow-md p-4 border rounded hover:bg-c400 dark:hover:text-black font-semibold"
                    onClick={handleApplyLoan}
                >
                  Apply Loan
                </button>
              </div>
            </>
          )}
        </div>
        {showDialog && (
          <div className="fixed z-10 inset-0 overflow-y-auto ">
            <div className=" flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div
                className="fixed inset-0 transition-opacity"
                aria-hidden="true"
              >
                <div className="absolute inset-0 opacity-75"></div>
              </div>
              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <div className="dark:bg-gray-900 dark:border-teal-300 bg-c100 inline-block align-bottom border rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className=" px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3
                        className="text-lg leading-6 font-medium"
                        id="modal-title"
                      >
                        {message.includes("Successfully") ? "Success" : "Error"}
                      </h3>
                      <hr className="shadow-md group-hover:shadow-teal-300 border-black dark:border-teal-300"/>
                      <div className="mt-2">
                        <p className="text-sm ">{message}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="x-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center  rounded-md border bg-c300 text-white hover:bg-teal-600 shadow-md dark:border-teal-200 dark:shadow-teal-300 px-4 py-2  text-base font-medium  hover:focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={handleCloseDialog}
                  >
                    OK
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Personalloan;
