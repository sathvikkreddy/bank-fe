import React, { useState } from 'react';
import PageTitle from '../../components/PageTitle';

const HealthInsurance = () => {
  const healthInsuranceDescription = `Health insurance provides coverage for medical expenses incurred due to illness or injury. It helps individuals and families afford healthcare services, including doctor visits, hospital stays, prescription medications, and preventive care. There are various types of health insurance plans available, each offering different levels of coverage and cost-sharing arrangements.`;

  const healthInsuranceTypes = [
    {
      id: 1,
      name: "Health Maintenance Organization (HMO)",
      coverageAmount: "$100,000",
      premiumAmount: "$50",
      duration: "1 year",
    },
    {
      id: 2,
      name: "Preferred Provider Organization (PPO)",
      coverageAmount: "$150,000",
      premiumAmount: "$75",
      duration: "1 year",
    },
    {
      id: 3,
      name: "Exclusive Provider Organization (EPO)",
      coverageAmount: "$120,000",
      premiumAmount: "$60",
      duration: "1 year",
    }
  ];

  const [selectedType, setSelectedType] = useState(null);
  const [pin, setPin] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const handleTypeSelect = (type) => {
    setSelectedType(type);
  };

  const handleBuyPlan = () => {
    // Logic for buying the selected insurance plan
    // Assuming user's actual pin is '1234'
    if (pin === '1234') {
      setShowPopup(true);
    } else {
      alert("Incorrect PIN. Please try again.");
    }
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const handleNavigateToInsurance = () => {
    // Navigate to the insurance main page (Insurance.jsx)
    window.location.href = '/insurance';
  };

  return (
    <div>
      <PageTitle title="Health Insurance" />
      <div className="p-8 leading-relaxed">
        
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Description of Health Insurance</h2>
          <p className="text-black">{healthInsuranceDescription}</p>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Select Insurance Type</h2>
          <ul>
            {healthInsuranceTypes.map((type) => (
              <li key={type.id}>
                <button
                  className={`cursor-pointer ${selectedType === type.id ? 'font-bold text-gray-600' : 'text-black-500 hover:underline'}`}
                  onClick={() => handleTypeSelect(type.id)}
                >
                  {type.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {selectedType && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Insurance Policy Details</h2>
            <p><strong>Plan name:</strong> {healthInsuranceTypes[selectedType - 1].name}</p>
            <p><strong>Coverage Amount:</strong> {healthInsuranceTypes[selectedType - 1].coverageAmount}</p>

            <p><strong>Premium Amount:</strong> {healthInsuranceTypes[selectedType - 1].premiumAmount}</p>
            <p><strong>Duration:</strong> {healthInsuranceTypes[selectedType - 1].duration}</p>
            <div className="mt-4">
              <input
                type="password"
                placeholder="Enter PIN"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="border border-gray-400 px-2 py-1 rounded"
              />
              <button
                className="text-black border border-black hover:border-gray-800 font-bold py-2 px-4 rounded ml-2"
                onClick={handleBuyPlan}
              >
                Buy Plan
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Popup for successful purchase */}
      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg">
            <p className="text-xl font-semibold mb-4">Successfully purchased health policy!</p>
            <div className="flex justify-end">
              <button
                className="text-black-500 font-semibold mr-4"
                onClick={handleNavigateToInsurance}
              >
                My active plans
              </button>
              <button
                className="text-red-500 font-semibold"
                onClick={handlePopupClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HealthInsurance;
