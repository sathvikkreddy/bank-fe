import React, { useState, useEffect } from 'react';
import { Link} from 'react-router-dom';
import PageTitle from '../../components/PageTitle';
const MainInsurance = () => {
  // Sample data for active plans
  const [activePlans, setActivePlans] = useState([]);

  useEffect(() => {
    // Logic to fetch active plans from the database
    const fetchData = async () => {
      try {
        // Simulate fetching data
        setTimeout(() => {
          // Sample data received from the database
          const data = [
            {
              id: 1,
              name: 'Life Insurance',
              coverageAmount: '$100,000',
              due: '$50',
              renewalDate: '2024-06-01',
            },
            // Add more sample data as needed
          ];

          // Set active plans received from the database
          setActivePlans(data);
        }, 1000);
      } catch (error) {
        console.error('Error fetching active plans:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-8">
      <PageTitle title="Insurance" />

      <h2 className="text-2xl font-bold mb-4">My Active Plans</h2>

      {activePlans.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {activePlans.map(plan => (
            <div key={plan.id} className="bg-gray-100 p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-2">{plan.name}</h2>
              <p><strong>Policy ID:</strong> {plan.id}</p>
              <p><strong>Coverage Amount:</strong> {plan.coverageAmount}</p>
              <p><strong>Due:</strong> {plan.due}</p>
              <p><strong>Renewal Date:</strong> {plan.renewalDate}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-gray-500 flex items-center justify-center h-40">
          <svg className="h-8 w-8 text-gray-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6-7h12a2 2 0 012 2v7a2 2 0 01-2 2H6a2 2 0 01-2-2v-7a2 2 0 012-2z" />
          </svg>
          <p>No active plans are available.</p>
        </div>
      )}

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Types of Insurances</h2>
        <div className="grid grid-cols-3 gap-4">
          <Link to="/insurance/insurance/life" className="py-4 rounded-lg text-center border border-gray-300 flex flex-col items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mb-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
            </svg>
            <span>Life Insurance</span>
          </Link>
          <Link to="/insurance/health" className="py-4 rounded-lg text-center border border-gray-300 flex flex-col items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mb-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
            <span>Health Insurance</span>
          </Link>
          <Link to="/insurance/vehicle" className="py-4 rounded-lg text-center border border-gray-300 flex flex-col items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mb-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
            </svg>
            <span>Vehicle Insurance</span>
          </Link>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Claim Option</h2>
        <Link to="/insurance/file-claim" className="py-4 rounded-lg text-center border border-gray-300 block flex flex-col items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mb-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 8.25H9m6 3H9m3 6-3-3h1.5a3 3 0 1 0 0-6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
          <span>File a Claim</span>
        </Link>
      </div>

      
    </div>
  );
};

export default MainInsurance;
