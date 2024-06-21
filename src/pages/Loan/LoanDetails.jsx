import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import NotFound from "../NotFound";

import PageTitle from "../../components/PageTitle";
const LoanDetails = () => {
  const [profile] = useOutletContext();
  const { loanId } = useParams();
  const [loan, setLoan] = useState(null);
  const [stat, setStat] = useState("");
  const [acc, setAcc] = useState(null);
  const [emp, setEmp] = useState(" ");
  const [pid, setPid] = useState("");

  const [loanPayables, setLoanPayables] = useState([]);
  const [filteredPayables, setFilteredPayables] = useState([]);
  const [filter, setFilter] = useState("Pending");
  const [dialog, setDialog] = useState({
    isOpen: false,
    message: "",
    isError: false,
  });

  function capitalizeFirstLetter(str) {
    // Handle empty string or strings with only whitespace
    if (!str.trim()) return str;

    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  const token = localStorage.getItem("authorization");
  useEffect(() => {
    // Fetch loan details from profile
    const fetchedLoan = profile.loans.find(
      (loan) => loan.loanDetailsId === loanId
    );
    setLoan(fetchedLoan);
    const AccDetail = profile.accounts.find(
      (l) => l.id === fetchedLoan.accountId
    );
    setAcc(AccDetail);

    // Fetch loan payables for the loan
    if (fetchedLoan) {
      const fetchedPayables = profile.loanPayables.filter(
        (payable) => payable.loanId === fetchedLoan.loanId
      );

      setLoanPayables(fetchedPayables);
      setFilteredPayables(
        fetchedPayables.filter((payable) => payable.status === filter)
      );
      setPid(fetchedLoan.loanId);
    }
  }, [loanId, profile, filter]);

  const formatNumber = (number) => {
    return number.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  function formatTimestampToDate(timestamp) {
    let date = new Date(timestamp);

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    day = day < 10 ? "0" + day : day;
    month = month < 10 ? "0" + month : month;

    let formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
  }

  const countStatus = (status) => {
    return loanPayables.filter((payable) => payable.status === status).length;
  };
  const handleFilterChange = (status) => {
    setFilter(status);
    setStat(status);

    setFilteredPayables(
      loanPayables.filter((payable) => payable.status === status)
    );
  };

  const handlePayEMI = async (payableId) => {
    const postData = {
      payablesId: payableId,
      accountId: loan.accountId,
    };

    try {
      const response = await fetch(
        "https://techbuzzers.somee.com/PayLoanInstallment",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData));
      }

      const responseData = await response.json();
      console.log("Payment successful:", responseData);

      // Update status of the paid payable in the UI
      const updatedPayables = loanPayables.map((payable) =>
        payable.id === payableId ? { ...payable, status: "Paid" } : payable
      );
      setLoanPayables(updatedPayables);
      setFilteredPayables(
        updatedPayables.filter((payable) => payable.status === filter)
      );

      // Show success dialog
      setDialog({
        isOpen: true,
        message: "Payment successful",
        isError: false,
      });
    } catch (error) {
      console.error("Error paying EMI:", error);

      // Show error dialog with error message
      setDialog({
        isOpen: true,
        message: `Error paying EMI: ${error.message}`,
        isError: true,
      });
    }
  };

  const closeDialog = () => {
    setDialog({ isOpen: false, message: "", isError: false });
  };

  if (!loan) {
    return <NotFound />;
  }

  return (
    <>
      <PageTitle title={loan.loanType} />
      <div className="container mx-auto p-4">
        <div className="">
          <div className="grid grid-cols-2 border border-gray-300 shadow-md dark:shadow-slate-600 rounded-md mb-4 p-2">
            <div className="sm:grid sm:grid-cols-2 gap-2 py-2">
              <div className="font-medium">LOAN ID :</div>
              <div className="">{pid}</div>
            </div>
            <div className="sm:grid sm:grid-cols-2 gap-2 py-2">
              <div className="font-medium">ACCOUNT ID :</div>
              <div className="">{loan.accountId}</div>
            </div>
            <div className="sm:grid sm:grid-cols-2 gap-2 py-2">
              <div className="font-medium">LOAN AMOUNT : </div>
              <div className="">₹{formatNumber(loan.loanAmount)}</div>
            </div>
            <div className="sm:grid sm:grid-cols-2 gap-2 py-2">
              <div className="font-medium">ACCOUNT TYPE : </div>
              <div className="">{capitalizeFirstLetter(acc.accountName)}</div>
            </div>

            <div className="sm:grid sm:grid-cols-2 gap-2 py-2">
              <div className="font-medium">TENURE : </div>
              <div className="">{loan.tenure}</div>
            </div>
            <div className="sm:grid sm:grid-cols-2 gap-2 py-2">
              <div className="font-medium">APPLIED ON : </div>
              <div className="">{formatTimestampToDate(loan.timeStamp)}</div>
            </div>
          </div>
        </div>

        <button
          className=" bg-white dark:bg-c700 text-black dark:text-white px-4 py-2 rounded shadow-md dark:shadow-teal-300 mb-4 p-4 border hover:bg-teal-200 dark:hover:text-black dark:hover:bg-teal-500 "
          onClick={() => setFilteredPayables(loanPayables)}
        >
          All EMI's
        </button>

        <div className="text-xl font-medium uppercase my-2">EMI's</div>
        <div className="flex space-x-4 border border-gray-300 p-1 rounded-md shadow-md dark:shadow-sm dark:shadow-teal-300">
          {["Pending", "Due", "Paid"].map((status) => (
            <button
              key={status}
              className={`px-4 py-2 rounded ${
                filter === status
                  ? "bg-c300 dark:bg-c500 text-white dark:text-black"
                  : "bg-c300 dark:bg-c500"
              }`}
              onClick={() => handleFilterChange(status)}
            >
              {status} {countStatus(status)}
            </button>
          ))}
        </div>

        {/* <div className="bg-white p-6 rounded shadow-md"> */}
        <div className=" dark:bg-black bg-transparent dark:text-white my-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ">
          {filteredPayables.length > 0 ? (
            filteredPayables.map((payable) => (
              <div
                key={payable.id}
                className="p-4 border dark:bg-gray-900 bg-white rounded mb-2 space-y-2 shadow-md"
              >
                <p  className="dark:text-c200">
                  <strong className="text-c300 dark:text-c600">Month:</strong> {payable.month}
                </p>
                <hr className="shadow-md group-hover:shadow-teal-300 border-gray-300 dark:border-teal-300"/>

                <div className="font-semibold sm:text-base text-xs">
                  Amount:{" "}
                  <span className="font-normal">
                    ₹{formatNumber(payable.amount)}
                  </span>
                </div>
                <div className="font-semibold sm:text-base text-xs">
                  Due Date:{" "}
                  <span className="font-normal">
                    {formatTimestampToDate(payable.dueDate)}
                  </span>
                </div>
                <div className="font-semibold sm:text-base text-xs">
                  Status: &nbsp;
                  <span
                    className={` ${
                      payable.status === "Paid"
                        ? "text-green-500"
                        : "font-normal"
                    }`}
                  >
                    {payable.status}
                  </span>
                </div>
                {payable.status == "Due" && (
                  <button
                    className="px-4 py-2 bg-c300 dark:bg-c500 dark:hover:border-teal-300 text-white dark:text-black mt-2 shadow-md p-4 border rounded hover:bg-c300 dark:hover:text-black hover:font-semibold"
                    onClick={() => handlePayEMI(payable.id)}
                  >
                    Pay EMI
                  </button>
                )}
              </div>
            ))
          ) : (
            <p>No payables {stat}.</p>
          )}
        </div>
        {dialog.isOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div
              className={`bg-white p-6 rounded shadow-md ${
                dialog.isError ? "border-red-500" : "border-green-500"
              }`}
            >
              <p className="mb-4">{dialog.message}</p>
              <button
                className=" px-4 py-2 rounded border bg-c300 text-white hover:bg-teal-600 shadow-md dark:border-teal-200 dark:shadow-teal-300 mb-4 transition-transform duration-300 hover:shadow-lg relative group p-4  hover:text-black hover:font-semibold"
                onClick={closeDialog}
              >
                Close
              </button>
            </div>
          </div>
        )}

        {dialog.isOpen && (
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
              <div className="dark:bg-gray-900 dark:border-teal-300 bg-c100 inline-block align-bottom border rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3
                        className="text-lg leading-6 font-medium text-gray-900"
                        id="modal-title"
                      >
                        {}
                      </h3>
                      <hr className="shadow-md group-hover:shadow-teal-300 border-black dark:border-teal-300"/>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          {dialog.message}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center  rounded-md border bg-c300 text-white hover:bg-teal-600 shadow-md dark:border-teal-200 dark:shadow-teal-300 px-4 py-2  text-base font-medium  hover:focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={closeDialog}
                  >
                    OK
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default LoanDetails;
