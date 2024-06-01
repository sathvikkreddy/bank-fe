import React from 'react';
import { Link } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';

const LoanHistory = () => {
  const [profile] = useOutletContext();

  const formatNumber = (number) => {
    return number.toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Applied Loans</h1>
      <div className="p-6 rounded shadow-md bg-gray-50">
        {profile.loans.length > 0 ? (
          <ul>
            {profile.loans.map(loan => (
              <li key={loan.loanDetailsId} className="mb-4">
                <Link to={`LoanDetails/${loan.loanDetailsId}`}>
                  <div className="transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg relative group p-4 border rounded hover:bg-white">
                    <div className="flex justify-center">
                      <strong><p>Applied {loan.loanType}</p></strong>
                    </div>
                    
                    <hr/>
                    <br />
                    <p>Account ID: {loan.accountId}</p>
                    <p>Loan Amount: ₹{formatNumber(loan.loanAmount)}</p>
                    <p>Tenure: {loan.tenure} months</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>Apply From Below</p>
        )}
      </div>
    </div>
  );
};

export default LoanHistory;
