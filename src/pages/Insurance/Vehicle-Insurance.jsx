import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageTitle from '../../components/PageTitle';

const VehicleInsurance = () => {
  const VehicleInsuranceDescription = `Vehicle insurance provides financial protection for your vehicle against various risks and liabilities. It offers coverage for damages caused by collisions, theft, vandalism, fire, and natural disasters. Vehicle insurance ensures that you are financially protected from unforeseen circumstances while driving your vehicle. Different types of vehicle insurance policies cater to varying needs and preferences, offering coverage options and features tailored to individual requirements.`;

  const [vehicleCost, setVehicleCost] = useState('');
  const [manufacturingYear, setManufacturingYear] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [pin, setPin] = useState('');
  const [planDetails, setPlanDetails] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showPinError, setShowPinError] = useState(false);

  const handleCalculateClick = () => {
    // Check if any of the input fields are empty
    if (
      vehicleCost.trim() === '' ||
      manufacturingYear.trim() === '' ||
      vehicleNumber.trim() === ''
    ) {
      alert('Please fill in all the required fields.');
      return; // Exit early if any field is empty
    }

    // Simulating plan details calculation
    const chosenPlan = {
      coverageAmount: 1000000,
      premiumINR: 15000,
      duration: '1 year'
    };

    // Set the chosen plan details
    setPlanDetails(chosenPlan);
  };

  const handleBuyPlanClick = () => {
    // Check if the entered PIN matches the correct PIN
    if (pin === '1234') { // Replace '1234' with the correct PIN
      // Show success modal
      setShowSuccessModal(true);
      // Clear the PIN
      setPin('');
      // Hide PIN error
      setShowPinError(false);
    } else {
      // Show PIN error
      setShowPinError(true);
    }
  };

  return (
    <div>
      <PageTitle title="Vehicle Insurance" />
      <div className="p-8 leading-relaxed">
        <div className="p-8">
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Description of Vehicle Insurance</h2>
            <p className="text-black">{VehicleInsuranceDescription}</p>
          </div>
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Get an Insurance Policy</h2>
            <div className="flex flex-wrap justify-center items-center">
              <div className="flex flex-col mb-4 w-1/4">
                <label htmlFor="vehicleCost" className="block text-sm font-medium text-gray-700 mb-1">
                  Vehicle Cost
                </label>
                <input
                  type="text"
                  id="vehicleCost"
                  placeholder="2000000"
                  className="border border-gray-300 p-2 rounded w-full"
                  value={vehicleCost}
                  onChange={(e) => setVehicleCost(e.target.value)}
                />
              </div>
              <div className="flex flex-col mb-4 w-1/4">
                <label htmlFor="manufacturingYear" className="block text-sm font-medium text-gray-700 mb-1">
                  Year of Manufacturing
                </label>
                <input
                  type="text"
                  id="manufacturingYear"
                  placeholder="2000"
                  className="border border-gray-300 p-2 rounded w-full"
                  value={manufacturingYear}
                  onChange={(e) => setManufacturingYear(e.target.value)}
                />
              </div>
              <div className="flex flex-col mb-4 w-1/4">
                <label htmlFor="vehicleNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Vehicle Number
                </label>
                <input
                  type="text"
                  id="vehicleNumber"
                  placeholder="KA03HA1985."
                  className="border border-gray-300 p-2 rounded w-full"
                  value={vehicleNumber}
                  onChange={(e) => setVehicleNumber(e.target.value)}
                />
              </div>
              <div className="flex flex-col mb-4 w-1/4">
                <label htmlFor="pin" className="block text-sm font-medium text-gray-700 mb-1">
                  4-digit PIN
                </label>
                <div className="flex items-center">
                  <input
                    type="password"
                    id="pin"
                    placeholder="1234"
                    className="border border-gray-300 p-2 rounded w-full"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                  />
                  <button
                    className="bg-black text-white font-bold py-2 px-4 rounded ml-2"
                    onClick={handleCalculateClick}
                  >
                    Submit
                  </button>
                </div>
                {showPinError && <p className="text-red-500 text-sm mt-1">Incorrect PIN. Please try again.</p>}
              </div>
            </div>
          </div>
          {planDetails && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Insurance Plan Details</h2>
              <p>Coverage Amount: {planDetails.coverageAmount}</p>
              <p>Premium: {planDetails.premiumINR}</p>
              <p>Duration: {planDetails.duration}</p>
              <div className="mt-4">
                <button
                  className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                  onClick={handleBuyPlanClick}
                >
                  Buy Plan
                </button>
              </div>
            </div>
          )}
        </div>
        {showSuccessModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg flex flex-col items-center">
              <h2 className="text-2xl font-bold mb-4">Success</h2>
              <p className="text-gray-600 mb-4">Successfully purchased vehicle insurance.</p>
              <div className="flex justify-center">
                <Link to="/insurance" className="mr-2">
                  <button className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded">
                    My Active Plans
                  </button>
                </Link>
                <button
                  className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded w-full "
                  onClick={() => setShowSuccessModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VehicleInsurance;
