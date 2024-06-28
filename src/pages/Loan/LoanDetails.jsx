// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { useOutletContext } from "react-router-dom";
// import updateOutletContext from "../../utils/updateOutletContext";

// import NotFound from "../NotFound";

// import PageTitle from "../../components/PageTitle";
// const LoanDetails = () => {
//   const [
//     profile,
//     isLoading,
//     transactions,
//     setProfile,
//     setIsLoading,
//     setTransactions,
//   ] = useOutletContext();
//   const { loanId } = useParams();
//   const [loan, setLoan] = useState(null);
//   const [stat, setStat] = useState("");
//   const [acc, setAcc] = useState(null);
//   const [emp, setEmp] = useState(" ");
//   const [pid, setPid] = useState("");

//   const [loanPayables, setLoanPayables] = useState([]);
//   const [filteredPayables, setFilteredPayables] = useState([]);
//   const [filter, setFilter] = useState("Upcoming");
//   const [dialog, setDialog] = useState({
//     isOpen: false,
//     message: "",
//     isError: false,
//   });

//   function capitalizeFirstLetter(str) {
//     // Handle empty string or strings with only whitespace
//     if (!str.trim()) return str;

//     return str.charAt(0).toUpperCase() + str.slice(1);
//   }
//   const token = localStorage.getItem("authorization");
//   useEffect(() => {
//     // Fetch loan details from profile
//     const fetchedLoan = profile.loans.find(
//       (loan) => loan.loanDetailsId === loanId
//     );
//     setLoan(fetchedLoan);
//     const AccDetail = profile.accounts.find(
//       (l) => l.id === fetchedLoan.accountId
//     );
//     setAcc(AccDetail);

//     // Fetch loan payables for the loan
//     if (fetchedLoan) {
//       const fetchedPayables = profile.loanPayables.filter(
//         (payable) => payable.loanId === fetchedLoan.loanId
//       );

//       setLoanPayables(fetchedPayables);
//       setFilteredPayables(
//         fetchedPayables.filter((payable) => payable.status === filter)
//       );
//       setPid(fetchedLoan.loanId);
//     }
//   }, [loanId, profile, filter]);

//   const formatNumber = (number) => {
//     return number.toLocaleString("en-IN", {
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2,
//     });
//   };

//   function formatTimestampToDate(timestamp) {
//     let date = new Date(timestamp);

//     let day = date.getDate();
//     let month = date.getMonth() + 1;
//     let year = date.getFullYear();

//     day = day < 10 ? "0" + day : day;
//     month = month < 10 ? "0" + month : month;

//     let formattedDate = `${day}-${month}-${year}`;
//     return formattedDate;
//   }

//   const countStatus = (status) => {
//     return loanPayables.filter((payable) => payable.status === status).length;
//   };
//   const handleFilterChange = (status) => {
//     setFilter(status);
//     setStat(status);

//     setFilteredPayables(
//       loanPayables.filter((payable) => payable.status === status)
//     );
//   };

//   const handlePayEMI = async (payableId) => {
//     const postData = {
//       payablesId: payableId,
//       accountId: loan.accountId,
//     };

//     try {
//       const response = await fetch(
//         "https://techbuzzers.somee.com/PayLoanInstallment",
//         {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(postData),
//         }
//       );

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(JSON.stringify(errorData));
//       }

//       const responseData = await response.json();

//       console.log("Payment successful:", responseData);

//       // Update status of the paid payable in the UI
//       const updatedPayables = loanPayables.map((payable) =>
//         payable.id === payableId ? { ...payable, status: "Paid" } : payable
//       );
//       setLoanPayables(updatedPayables);
//       setFilteredPayables(
//         updatedPayables.filter((payable) => payable.status === filter)
//       );

//       // Show success dialog
//       setDialog({
//         isOpen: true,
//         message: "Payment successful",
//         isError: false,
//       });
//     } catch (error) {
//       console.error("Error paying EMI:", error);

//       // Show error dialog with error message
//       setDialog({
//         isOpen: true,
//         message: `Error paying EMI: ${error.message}`,
//         isError: true,
//       });
//     }
//   };

//   const closeDialog = () => {
//     updateOutletContext(setProfile, setTransactions, setIsLoading);

//     setDialog({ isOpen: false, message: "", isError: false });
//   };

//   if (!loan) {
//     return <NotFound />;
//   }

//   return (
//     <>
//       <PageTitle title={loan.loanType} />
//       <div className="container mx-auto p-4">
//         <div className="">
//           <div className="grid grid-cols-2 border border-gray-300 shadow-md dark:shadow-slate-600 rounded-md mb-4 p-2">
//             <div className="sm:grid sm:grid-cols-2 gap-2 py-2">
//               <div className="font-medium">LOAN ID :</div>
//               <div className="">{pid}</div>
//             </div>
//             <div className="sm:grid sm:grid-cols-2 gap-2 py-2">
//               <div className="font-medium">ACCOUNT ID :</div>
//               <div className="">{loan.accountId}</div>
//             </div>
//             <div className="sm:grid sm:grid-cols-2 gap-2 py-2">
//               <div className="font-medium">LOAN AMOUNT : </div>
//               <div className="">₹{formatNumber(loan.loanAmount)}</div>
//             </div>
//             <div className="sm:grid sm:grid-cols-2 gap-2 py-2">
//               <div className="font-medium">ACCOUNT TYPE : </div>
//               <div className="">{capitalizeFirstLetter(acc.accountName)}</div>
//             </div>

//             <div className="sm:grid sm:grid-cols-2 gap-2 py-2">
//               <div className="font-medium">TENURE : </div>
//               <div className="">{loan.tenure}</div>
//             </div>
//             <div className="sm:grid sm:grid-cols-2 gap-2 py-2">
//               <div className="font-medium">APPLIED ON : </div>
//               <div className="">{formatTimestampToDate(loan.timeStamp)}</div>
//             </div>
//           </div>
//         </div>
//         <div className="">
// <div className="conatiner mx-auto py-4 border border-gray-300 dark:border-gray-600 shadow-md dark:shadow-slate-600 rounded-md m-2 p-2 flex flex-col gap-4">
//         <div className="text-xl font-medium uppercase mt-2">EMI's</div>
//         <div className="flex space-x-4 border border-gray-300 dark:border-gray-600 p-1 rounded-md shadow-md dark:shadow-slate-600">
//           <button
//             className={`px-4 py-2 ${
//               filter === "Due" ? "bg-c500" : "dark:bg-c700 bg-c300"
//             } hover:bg-c600 rounded`}
//             onClick={() => handleFilterChange("Due")}
//           >
//             Due {countStatus("Due")}
//           </button>
//           <button
//             className={`px-4 py-2 ${
//               filter === "Upcoming" ? " bg-c500 " : "dark:bg-c700 bg-c300"
//             } hover:bg-c600 rounded`}
//             onClick={() => handleFilterChange("Upcoming")}
//           >
//             Upcoming {countStatus("Upcoming")}
//           </button>
//           <button
//             className={`px-4 py-2 ${
//               filter === "Paid" ? " bg-c500 " : "dark:bg-c700 bg-c300"
//             } hover:bg-c600 rounded`}
//             onClick={() => handleFilterChange("Paid")}
//           >
//             Paid {countStatus("Paid")}
//           </button>
//         </div>
//         <div className="bg-transparent dark:text-white my-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ">
//           {filteredPayables.length > 0 ? (
//             filteredPayables.map((payable) => (
//               <div
//                 key={payable.id}
//                 className="p-4 border dark:bg-gray-900 bg-white rounded mb-2 space-y-2 shadow-md"
//               >
//                 <p  className="dark:text-c200">
//                   <strong className="text-c300 dark:text-c600">Month:</strong> {payable.month}
//                 </p>
//                 <hr className="shadow-md group-hover:shadow-teal-300 border-gray-300 dark:border-teal-300"/>

//                 <div className="font-semibold sm:text-base text-xs">
//                   Amount:{" "}
//                   <span className="font-normal">
//                     ₹{formatNumber(payable.amount)}
//                   </span>
//                 </div>
//                 <div className="font-semibold sm:text-base text-xs">
//                   Due Date:{" "}
//                   <span className="font-normal">
//                     {formatTimestampToDate(payable.dueDate)}
//                   </span>
//                 </div>
//                 <div className="font-semibold sm:text-base text-xs">
//                   Status: &nbsp;
//                   <span
//                     className={` ${
//                       payable.status === "Paid"
//                         ? "text-green-500"
//                         : "font-normal"
//                     }`}
//                   >
//                     {payable.status}
//                   </span>
//                 </div>
//                 {payable.status == "Due" && (
//                   <button
//                     className="px-4 py-2 bg-c300 dark:bg-c500 dark:hover:border-teal-300 text-white dark:text-black mt-2 shadow-md p-4 border rounded hover:bg-c300 dark:hover:text-black hover:font-semibold"
//                     onClick={() => handlePayEMI(payable.id)}
//                   >
//                     Pay EMI
//                   </button>
//                 )}
//               </div>
//             ))
//           ) : (
//             <p className="bg-transparent">No payables {stat}.</p>
//           )}
//         </div>
//         </div>

//       </div>
//         {dialog.isOpen && (
//           <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//             <div
//               className={`bg-c100 dark:bg-c700 p-6 rounded shadow-md ${
//                 dialog.isError ? "border-red-500" : "border-green-500"
//               }`}
//             >
//               <p className="mb-4">{dialog.message}</p>
//               <button
//                 className=" px-4 py-2 rounded border bg-c300 text-white hover:bg-teal-600 shadow-md dark:border-teal-200 dark:shadow-teal-300 mb-4 transition-transform duration-300 hover:shadow-lg relative group p-4  hover:text-black hover:font-semibold"
//                 onClick={closeDialog}
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         )}

//         {dialog.isOpen && (
//           <div className="fixed z-10 inset-0 overflow-y-auto">
//             <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
//               <div
//                 className="fixed inset-0 transition-opacity"
//                 aria-hidden="true"
//               >
//                 <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
//               </div>
//               <span
//                 className="hidden sm:inline-block sm:align-middle sm:h-screen"
//                 aria-hidden="true"
//               >
//                 &#8203;
//               </span>
//               <div className="dark:bg-gray-900 dark:border-teal-300 dark:text-white bg-c100 inline-block align-bottom border rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
//                 <div className="bg-c100 dark:bg-c700 dark:text-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
//                   <div className="sm:flex sm:items-start">
//                     <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
//                       <h3
//                         className="text-lg dark:text-white leading-6 font-medium text-gray-900"
//                         id="modal-title"
//                       >
//                         {}
//                       </h3>
//                       <hr className="shadow-md group-hover:shadow-teal-300 dark:text-white border-black dark:border-teal-300"/>
//                       <div className="mt-2">
//                         <p className="text-sm dark:text-white text-gray-500">
//                           {dialog.message}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="bg-c100 dark:bg-c700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
//                   <button
//                     type="button"
//                     className="w-full inline-flex justify-center  rounded-md border bg-c300 text-white dark:bg-teal-700 hover:bg-teal-600 dark:border-teal-200  px-4 py-2  text-base font-medium  hover:focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 sm:ml-3 sm:w-auto sm:text-sm"
//                     onClick={closeDialog}
//                   >
//                     OK
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default LoanDetails;







import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import updateOutletContext from "../../utils/updateOutletContext";
import NotFound from "../NotFound";
import PageTitle from "../../components/PageTitle";
import toast from "react-hot-toast";

const LoanDetails = () => {
  const [
    profile,
    isLoading,
    transactions,
    setProfile,
    setIsLoading,
    setTransactions,
  ] = useOutletContext();
  const { loanId } = useParams();
  const [loan, setLoan] = useState(null);
  const [stat, setStat] = useState("");
  const [acc, setAcc] = useState(null);
  const [pid, setPid] = useState("");
  const [loanPayables, setLoanPayables] = useState([]);
  const [filteredPayables, setFilteredPayables] = useState([]);
  const [filter, setFilter] = useState("Upcoming");
  const [dialog, setDialog] = useState({
    isOpen: false,
    message: "",
    isError: false,
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPayable, setSelectedPayable] = useState(null);
  const [pin, setPin] = useState("");

  function capitalizeFirstLetter(str) {
    if (!str.trim()) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const token = localStorage.getItem("authorization");

  useEffect(() => {
    const fetchedLoan = profile.loans.find(
      (loan) => loan.loanDetailsId === loanId
    );
    setLoan(fetchedLoan);
    const AccDetail = profile.accounts.find(
      (l) => l.id === fetchedLoan.accountId
    );
    setAcc(AccDetail);

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
    return `${day}-${month}-${year}`;
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

  const handlePayEMI = async () => {
    if (pin != profile.userDetails.pin) {
      toast.error("entered pin is wrong");
      return;
    }

    const postData = {
      payablesId: selectedPayable.id,
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

      const updatedPayables = loanPayables.map((payable) =>
        payable.id === selectedPayable.id
          ? { ...payable, status: "Paid" }
          : payable
      );
      setLoanPayables(updatedPayables);
      setFilteredPayables(
        updatedPayables.filter((payable) => payable.status === filter)
      );

      setDialog({
        isOpen: true,
        message: "Payment successful",
        isError: false,
      });
      setModalOpen(false);
    } catch (error) {
      setDialog({
        isOpen: true,
        message: `Error paying EMI`,
        isError: true,
      });
      setModalOpen(false);
    }
  };

  const closeDialog = () => {
    updateOutletContext(setProfile, setTransactions, setIsLoading);
    setDialog({ isOpen: false, message: "", isError: false });
  };

  const openModal = (payable) => {
    setSelectedPayable(payable);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedPayable(null);
    setPin("");
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
            <div className="sm:grid sm:grid-cols-2 gap-2 py-2 ">
              <div className="font-medium">STATUS : </div>
              <div
                className={`font-semibold ${
                  loan.status === "Active" || loan.status === "Clear"
                    ? "text-green-600"
                    : "text-orange-600"
                }`}
              >
              
                {loan.status}
              </div>
            </div>

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
              <div className="">{loan.tenure} Months</div>
            </div>
            <div className="sm:grid sm:grid-cols-2 gap-2 py-2">
              <div className="font-medium">APPLIED ON : </div>
              <div className="">{formatTimestampToDate(loan.timeStamp)}</div>
            </div>

            <div className="sm:grid sm:grid-cols-2 gap-2 py-2">
              <div className="font-medium">INTEREST RATE : </div>
              <div className="">{loan.roi}%</div>
            </div>
          </div>
        </div>
        <div className="container mx-auto py-4 border border-gray-300 dark:border-gray-600 shadow-md dark:shadow-slate-600 rounded-md m-2 p-2 flex flex-col gap-4">
          <div className="text-xl font-medium uppercase mt-2">EMI's</div>
          <div className="flex space-x-4 border border-gray-300 dark:border-gray-600 p-1 rounded-md shadow-md dark:shadow-slate-600">
            <button
              className={`px-4 py-2 ${
                filter === "Due" ? "bg-c500" : "dark:bg-c700 bg-c300"
              } hover:bg-c600 rounded`}
              onClick={() => handleFilterChange("Due")}
            >
              Due {countStatus("Due")}
            </button>
            <button
              className={`px-4 py-2 ${
                filter === "Upcoming" ? "bg-c500" : "dark:bg-c700 bg-c300"
              } hover:bg-c600 rounded`}
              onClick={() => handleFilterChange("Upcoming")}
            >
              Upcoming {countStatus("Upcoming")}
            </button>
            <button
              className={`px-4 py-2 ${
                filter === "Paid" ? "bg-c500" : "dark:bg-c700 bg-c300"
              } hover:bg-c600 rounded`}
              onClick={() => handleFilterChange("Paid")}
            >
              Paid {countStatus("Paid")}
            </button>
          </div>
          <div className="overflow-x-auto rounded-md">
            <table className="min-w-full border dark:border-gray-600 border-gray-300">
              <thead>
                <tr className="bg-c200 dark:bg-c700 leading-normal">
                  <th className="py-3 sm:px-6 px-1 text-left">EMI ID</th>
                  <th className="py-3 sm:px-6 px-1 text-left">Month</th>
                  <th className="py-3 sm:px-6 px-1 text-left">Due Date</th>
                  <th className="py-3 sm:px-6 px-1 text-left">Amount</th>
                  <th className="py-3 sm:px-6 px-1 text-left">Status</th>
                </tr>
              </thead>
              <tbody className="">
                {filteredPayables.length > 0 ? (
                  filteredPayables.map((payable) => (
                    <tr
                      key={payable.id}
                      className="border-b dark:border-b-gray-600 border-gray-200 dark:bg-transparent"
                    >
                      <td className="py-3 sm:px-6 px-1 text-left">
                        {payable.id}
                      </td>
                      <td className="py-3 sm:px-6 px-1 text-left">
                        {payable.month}
                      </td>
                      <td className="py-3 sm:px-6 px-1 text-left">
                        {formatTimestampToDate(payable.dueDate)}
                      </td>
                      <td className="py-3 sm:px-6 px-1 text-left">
                        ₹{formatNumber(payable.amount)}
                      </td>

                      <td className="py-3 sm:px-6 px-1 text-left">
                        {payable.status === "Due" ? (
                          <button
                            className="px-4 py-2 bg-c300 dark:bg-c500 dark:hover:border-teal-300 text-white dark:text-black mt-2 shadow-md p-4 border rounded hover:bg-c300 dark:hover:text-black hover:font-semibold"
                            onClick={() => openModal(payable)}
                          >
                            Pay EMI
                          </button>
                        ) : (

                         <p className={` ${
                payable.status === "Paid" ? "text-green-600 font-semibold" : ""
              } hover:bg-c600 rounded`
                          
                         }> {payable.status} </p> 
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="py-2 px-4 border-b text-center">
                      No payables {stat}.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {dialog.isOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div
              className={`bg-c100 dark:bg-c700 p-6 rounded shadow-md ${
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
      {modalOpen && selectedPayable && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen p-4 text-center sm:block sm:p-0">
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
            <div className="inline-block align-bottom bg-white dark:bg-gray-900 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg leading-6 font-medium text-c300 dark:text-white"
                      id="modal-title"
                    >
                      Pay EMI
                    </h3>
                    <hr className="shadow-md group-hover:shadow-teal-300 border-gray-300 dark:border-teal-300" />
                    <div className="mt-2">
                      <p className="text-sm text-black dark:text-white">
                        EMI ID: {selectedPayable.id}
                      </p>
                      <p className="text-sm text-black dark:text-white">
                        Month: {selectedPayable.month}
                      </p>
                      <p className="text-sm text-black dark:text-white">
                        Amount: ₹{formatNumber(selectedPayable.amount)}
                      </p>
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-white">
                          Enter PIN
                        </label>
                        <input
                          type="password"
                          value={pin}
                          onChange={(e) => {
                            setPin(e.target.value);
                          }}
                          className="font-medium p-2 border border-gray-300 text-teal-300 dark:border-gray-600 rounded-md dark:bg-transparent focus:border-black dark:focus:border-white"
                          placeholder="xxxx"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-c300 text-base font-medium text-white hover:bg-teal-600 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handlePayEMI}
                >
                  Pay EMI
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LoanDetails;
