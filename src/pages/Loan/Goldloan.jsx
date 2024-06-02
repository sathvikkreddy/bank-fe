import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";

const GoldLoan = () => {
  const [loanDetails, setLoanDetails] = useState([]);
      const [profile] = useOutletContext();

  const [selectedAmount, setSelectedAmount] = useState(null);
  const [roi, setRoi] = useState(null);
  const [tenureOptions, setTenureOptions] = useState([]);
  const [selectedTenure, setSelectedTenure] = useState(null);
  const [enteredAmount, setEnteredAmount] = useState("");
  const [emi, setEmi] = useState(null);
  const [pin, setPin] = useState("");
  const [accountId, setAccountId] = useState("");
  const [accounts, setAccounts] = useState([]);
  const [previousAmount, setPreviousAmount] = useState(null);
  const [message, setMessage] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [valid, setValid] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("authorization");

    const fetchData = async () => {
      try {
        const loanType = "Gold Loan";
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

  const handleTenureChange = (event) => {
    setSelectedTenure(event.target.value);
  };

  const handleEmiCalculation = () => {
    if (
      enteredAmount <= 0 ||
      enteredAmount < previousAmount ||
      enteredAmount > selectedAmount
    ) {
      setMessage(
        `Please enter an amount between ${previousAmount} and ${selectedAmount}`
      );
      setShowDialog(true);
      return;
    }
    const P = enteredAmount;
    const R = roi / 12 / 100;
    const N = selectedTenure;
    const emiCalc = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    setEmi(emiCalc.toFixed(2));
  };

  const handleApplyLoan = async () => {
    const token = localStorage.getItem("authorization");
    const existingGoldLoan = profile.loans.some(
      (loan) => loan.loanType === "Gold Loan"
    );

    if (existingGoldLoan) {
      setMessage("OOPS! you have \"Applied Gold Loan\". Request to Apply after its clearance...");
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
      return `${amount / 100000} Lakhs`;
    } else if (amount >= 100000) {
      return `${amount / 100000} Lakhs`;
    } else {
      return amount;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-4">Gold Loan</h1>
      <div className="bg-white p-6 rounded shadow-md">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Select Loan Amount Range
          </label>
          <select
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
              <label className="block text-sm font-medium text-gray-700">
                Rate of Interest
              </label>
              <div className="mt-1 p-2 border border-gray-300 rounded-md">
                {roi}%
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Select Tenure
              </label>
              <select
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                onChange={handleTenureChange}
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
            <label className=" flex-row block text-sm font-medium text-gray-700">
                ( Enter Specific Amount )
                <span>
                  {valid ? (
                    <span className="flex-row">✔️</span>
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
                type="number"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
              />
            </div>
            <div className="mb-4">
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded"
                onClick={handleEmiCalculation}
              >
                Calculate EMI
              </button>
            </div>
            {emi && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Your monthly payable EMI is:
                </label>
                <div className="mt-1 p-2 border border-gray-300 rounded-md">
                  ₹{emi}
                </div>
              </div>
            )}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Select Account ID
              </label>
              <select
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                onChange={(e) => setAccountId(e.target.value)}
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
              <label className="block text-sm font-medium text-gray-700">
                Enter PIN to verify
              </label>
              <input
                type="password"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <button
                className="bg-green-500 text-white py-2 px-4 rounded"
                onClick={handleApplyLoan}
              >
                Apply Loan
              </button>
            </div>
          </>
        )}
      </div>
      {showDialog && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-title"
                    >
                      {message.includes("Successfully") ? "Success" : "Error"}
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">{message}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-black text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:ml-3 sm:w-auto sm:text-sm"
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
  );
};

export default GoldLoan;
