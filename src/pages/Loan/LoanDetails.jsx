import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';

import PageTitle from '../../components/PageTitle';
const LoanDetails = () => {
  const [profile] = useOutletContext();
  const { loanId } = useParams();
  const [loan, setLoan] = useState(null);
  const [stat, setStat] = useState("");
  const [acc, setAcc] = useState(null);
  const [emp, setEmp] = useState(" ");
  const [loanPayables, setLoanPayables] = useState([]);
  const [filteredPayables, setFilteredPayables] = useState([]);
  const [filter, setFilter] = useState('Pending');
  const [dialog, setDialog] = useState({ isOpen: false, message: '', isError: false });
  const token = localStorage.getItem("authorization");


  useEffect(() => {
    // Fetch loan details from profile
    const fetchedLoan = profile.loans.find((loan) => loan.loanDetailsId === loanId);
    setLoan(fetchedLoan);
    const AccDetail = profile.accounts.find((l) => l.accountId === l.accountId);
    setAcc(AccDetail);
    

    // Fetch loan payables for the loan
    if (fetchedLoan) {
      const fetchedPayables = profile.loanPayables.filter((payable) => payable.loanId === fetchedLoan.loanId);
      setLoanPayables(fetchedPayables);
      setFilteredPayables(fetchedPayables.filter((payable) => payable.status === filter));
    }
  }, [loanId, profile, filter]);

  const formatNumber = (number) => {
    return number.toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };
  const countStatus = (status) => {
    if(status==="Upcoming"){
      status="Pending";
    }
    return loanPayables.filter((payable) => payable.status === status).length;
  };
  const handleFilterChange = (status) => {
    if(status==="Upcoming"){
      status="Pending";
    }
    setFilter(status);
    setStat(status)
    
    setFilteredPayables(loanPayables.filter((payable) => payable.status === status));
  };

  const handlePayEMI = async (payableId) => {
    const postData = {
      payablesId: payableId,
      accountId: loan.accountId,
    };

    try {
      const response = await fetch('https://techbuzzers.somee.com/PayLoanInstallment', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData));
      }

      const responseData = await response.json();
      console.log('Payment successful:', responseData);

      // Update status of the paid payable in the UI
      const updatedPayables = loanPayables.map((payable) =>
        payable.id === payableId ? { ...payable, status: 'Paid' } : payable
      );
      setLoanPayables(updatedPayables);
      setFilteredPayables(updatedPayables.filter((payable) => payable.status === filter));

      // Show success dialog
      setDialog({ isOpen: true, message: 'Payment successful', isError: false });
    } catch (error) {
      console.error('Error paying EMI:', error);

      // Show error dialog with error message
      setDialog({ isOpen: true, message: `Error paying EMI: ${error.message}`, isError: true });
    }
  };

  const closeDialog = () => {
    setDialog({ isOpen: false, message: '', isError: false });
  };

  if (!loan) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <PageTitle title="Loan Details"/>
    <div className="container mx-auto p-4">
      {/* <h1 className="text-2xl font-bold mb-4">Loan Details</h1> */}
      <div className=" shadow-md mb-4 transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg relative group p-4 border rounded hover:bg-white">
      <div className="flex justify-center">
      <strong><p>Loan Type:{loan.loanType}</p></strong> 
                    </div>
        <hr/>
        <br />

        <p><strong>Account ID:</strong> {loan.accountId}</p>
        <p><strong >Account Type :</strong> {acc.accountName}</p>
        <p><strong>Loan Amount:</strong> ₹{formatNumber(loan.loanAmount)}</p>
        <p><strong>Tenure:</strong> {loan.tenure} months</p>
        <p><strong>Timestamp:</strong> {new Date(loan.timeStamp).toLocaleString()}</p>
      </div>

      <button
        className=" bg-white text-black px-4 py-2 rounded  shadow-md mb-4 transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg relative group p-4 border hover:bg-black hover:text-white hover:font-semibold"
        onClick={() => setFilteredPayables(loanPayables)}
      >
        ALL EMI's
      </button>
      <div className="flex justify-around pt-4 mb-4 bg-gray-100">
        
        {['Upcoming', 'Due', 'Paid'].map((status) => (
          <button
            key={status}
            className={`px-4 py-2 rounded ${filter === status ? 'bg-black text-white shadow-md mb-4 transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg relative group p-4 border rounded hover:bg-white hover:text-black' : 'bg-black text-white shadow-md mb-4 transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg relative group p-4 border rounded hover:bg-white hover:text-black hover:font-semibold'}`}
            onClick={() => handleFilterChange(status)}
          >
            
            {status} {countStatus(status)}
            
          </button>
        ))}
      </div>

      <div className="bg-white p-6 rounded shadow-md">
        {filteredPayables.length > 0 ? (
          <ul>
            {filteredPayables.map((payable) => (
              <li key={payable.id} className="mb-4">
                <div className="p-4 border rounded mb-2">
                  <p><strong>◾Month:</strong> {payable.month}</p>
                  <p><strong>{emp}{emp}  Amount:</strong> ₹{formatNumber(payable.amount)}</p>
                  <p><strong>{emp} Due Date:</strong> {new Date(payable.dueDate).toLocaleDateString()}</p>
                  <p><strong>{emp} Status:</strong> {payable.status}</p>
                  {payable.status != "Paid" && (
                    <button
                      className=" px-4 py-2 mt-2 bg-black text-white shadow-md mb-4 transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg relative group p-4 border rounded hover:bg-white hover:text-black hover:font-semibold"
                      onClick={() => handlePayEMI(payable.id)}
                    >
                      Pay EMI
                      
                    </button>
                    
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No payables {stat}.</p>
        )}
      </div>

      {dialog.isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className={`bg-white p-6 rounded shadow-md ${dialog.isError ? 'border-red-500' : 'border-green-500'}`}>
            <p className="mb-4">{dialog.message}</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={closeDialog}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default LoanDetails;





















// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { useOutletContext } from 'react-router-dom';

// import PageTitle from '../../components/PageTitle';

// const LoanDetails = () => {
//   const [profile] = useOutletContext();
//   const { loanId } = useParams();
//   const [loan, setLoan] = useState(null);
//   const [stat, setStat] = useState("");
//   const [acc, setAcc] = useState(null);
//   const [emp, setEmp] = useState(" ");
//   const [loanPayables, setLoanPayables] = useState([]);
//   const [filteredPayables, setFilteredPayables] = useState([]);
//   const [filter, setFilter] = useState('Pending');
//   const [dialog, setDialog] = useState({ isOpen: false, message: '', isError: false });
//   const token = localStorage.getItem("authorization");

//   useEffect(() => {
//     // Fetch loan details from profile
//     const fetchedLoan = profile.loans.find((loan) => loan.loanDetailsId === loanId);
//     setLoan(fetchedLoan);
//     const AccDetail = profile.accounts.find((l) => l.accountId === loan.accountId); // Fixed account ID issue
//     setAcc(AccDetail);

//     // Fetch loan payables for the loan
//     if (fetchedLoan) {
//       const fetchedPayables = profile.loanPayables.filter((payable) => payable.loanId === fetchedLoan.loanId);
//       setLoanPayables(fetchedPayables);
//       setFilteredPayables(fetchedPayables.filter((payable) => payable.status === filter));
//     }
//   }, [loanId, profile, filter]);

//   const formatNumber = (number) => {
//     return number.toLocaleString('en-IN', {
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2,
//     });
//   };

//   const handleFilterChange = (status) => {
//     setFilter(status);
//     setStat(status);
//     setFilteredPayables(loanPayables.filter((payable) => payable.status === status));
//   };

//   const handlePayEMI = async (payableId) => {
//     const postData = {
//       payablesId: payableId,
//       accountId: loan.accountId,
//     };

//     try {
//       const response = await fetch('https://techbuzzers.somee.com/PayLoanInstallment', {
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(postData),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(JSON.stringify(errorData));
//       }

//       const responseData = await response.json();
//       console.log('Payment successful:', responseData);

//       // Update status of the paid payable in the UI
//       const updatedPayables = loanPayables.map((payable) =>
//         payable.id === payableId ? { ...payable, status: 'Paid' } : payable
//       );
//       setLoanPayables(updatedPayables);
//       setFilteredPayables(updatedPayables.filter((payable) => payable.status === filter));

//       // Show success dialog
//       setDialog({ isOpen: true, message: 'Payment successful', isError: false });
//     } catch (error) {
//       console.error('Error paying EMI:', error);

//       // Show error dialog with error message
//       setDialog({ isOpen: true, message: `Error paying EMI: ${error.message}`, isError: true });
//     }
//   };

//   const closeDialog = () => {
//     setDialog({ isOpen: false, message: '', isError: false });
//   };

//   if (!loan) {
//     return <div>Loading...</div>;
//   }

//   const countStatus = (status) => {
//     return loanPayables.filter((payable) => payable.status === status).length;
//   };

//   return (
//     <>
//       <PageTitle title="Loan Details" />
//       <div className="container mx-auto p-4">
//         <div className="shadow-md mb-4 transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg relative group p-4 border rounded hover:bg-white">
//           <div className="flex justify-center">
//             <strong><p>Loan Type: {loan.loanType}</p></strong>
//           </div>
//           <hr />
//           <br />
//           <p><strong>Account ID:</strong> {loan.accountId}</p>
//           <p><strong>Account Type:</strong> {acc?.accountName}</p>
//           <p><strong>Loan Amount:</strong> ₹{formatNumber(loan.loanAmount)}</p>
//           <p><strong>Tenure:</strong> {loan.tenure} months</p>
//           <p><strong>Timestamp:</strong> {new Date(loan.timeStamp).toLocaleString()}</p>
//         </div>

//         <button
//           className="bg-white text-black px-4 py-2 rounded shadow-md mb-4 transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg relative group p-4 border hover:bg-black hover:text-white hover:font-semibold"
//           onClick={() => setFilteredPayables(loanPayables)}
//         >
//           ALL EMI's
//         </button>

//         <div className="flex justify-around pt-4 mb-4 bg-gray-100">
//           {['Pending', 'Due', 'Paid'].map((status) => (
//             <button
//               key={status}
//               className={`px-4 py-2 rounded ${filter === status ? 'bg-black text-white shadow-md mb-4 transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg relative group p-4 border rounded hover:bg-white hover:text-black' : 'bg-black text-white shadow-md mb-4 transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg relative group p-4 border rounded hover:bg-white hover:text-black hover:font-semibold'}`}
//               onClick={() => handleFilterChange(status)}
//             >
//               {`${status} (${countStatus(status)})`}
//             </button>
//           ))}
//         </div>

//         <div className="bg-white p-6 rounded shadow-md">
//           {filteredPayables.length > 0 ? (
//             <ul>
//               {filteredPayables.map((payable) => (
//                 <li key={payable.id} className="mb-4">
//                   <div className="p-4 border rounded mb-2">
//                     <p><strong>◾Month:</strong> {payable.month}</p>
//                     <p><strong>{emp}{emp}  Amount:</strong> ₹{formatNumber(payable.amount)}</p>
//                     <p><strong>{emp} Due Date:</strong> {new Date(payable.dueDate).toLocaleDateString()}</p>
//                     <p><strong>{emp} Status:</strong> {payable.status}</p>
//                     {payable.status !== 'Paid' && (
//                       <button
//                         className="px-4 py-2 mt-2 bg-black text-white shadow-md mb-4 transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg relative group p-4 border rounded hover:bg-white hover:text-black hover:font-semibold"
//                         onClick={() => handlePayEMI(payable.id)}
//                       >
//                         Pay EMI
//                       </button>
//                     )}
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p>No payables {stat}.</p>
//           )}
//         </div>

//         {dialog.isOpen && (
//           <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//             <div className={`bg-white p-6 rounded shadow-md ${dialog.isError ? 'border-red-500' : 'border-green-500'}`}>
//               <p className="mb-4">{dialog.message}</p>
//               <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={closeDialog}>
//                 Close
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default LoanDetails;
