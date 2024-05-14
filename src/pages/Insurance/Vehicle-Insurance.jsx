import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageTitle from '../../components/PageTitle';

const VehicleInsurance = () => {
  const VehicleInsuranceDescription = `Vehicle insurance provides financial protection for your vehicle against various risks and liabilities. It offers coverage for damages caused by collisions, theft, vandalism, fire, and natural disasters. Vehicle insurance ensures that you are financially protected from unforeseen circumstances while driving your vehicle. Different types of vehicle insurance policies cater to varying needs and preferences, offering coverage options and features tailored to individual requirements.`;

  const VehicleInsuranceTypes = [
    {
      id: 1,
      name: <strong>Comprehensive Insurance</strong>,
      description: (
        <ul>
          <li><strong>Wide Coverage:</strong> Comprehensive insurance covers damages to your vehicle that are not caused by a collision, including theft, vandalism, fire, and natural disasters.</li>
          <li><strong>Financial Protection:</strong> It provides financial protection for your vehicle against a wide range of risks, offering peace of mind while driving.</li>
          <li><strong>Comprehensive Coverage:</strong> Comprehensive insurance offers extensive coverage for various non-collision-related damages, ensuring that your vehicle is protected in diverse scenarios.</li>
          <li><strong>Additional Benefits:</strong> Some comprehensive insurance policies may include additional benefits such as roadside assistance, rental car coverage, and windshield repair.</li>
          <li><strong>Customizable Coverage:</strong> Policyholders can often customize their comprehensive coverage by adding optional features or increasing coverage limits to suit their needs.</li>
        </ul>
      ),
      coverageAmount: 1000000,
      premiumINR: 15000,
      duration: '1 year'
    },
    {
      id: 2,
      name: <strong>Collision Insurance</strong>,
      description: (
        <ul>
          <li><strong>Collision Coverage:</strong> Collision insurance covers damages to your vehicle caused by a collision with another vehicle or object, regardless of fault.</li>
          <li><strong>Financial Protection:</strong> It provides financial protection for your vehicle in the event of an accident, ensuring that repair or replacement costs are covered.</li>
          <li><strong>Repair Coverage:</strong> Collision insurance typically covers repair costs for damages sustained in a collision, helping to restore your vehicle to its pre-accident condition.</li>
          <li><strong>Peace of Mind:</strong> Knowing that collision damages are covered can provide peace of mind while driving, especially in high-traffic areas or adverse weather conditions.</li>
          <li><strong>Driver Confidence:</strong> Collision insurance can boost driver confidence by alleviating concerns about the financial impact of accidents, allowing you to focus on safe driving.</li>
        </ul>
      ),
      coverageAmount: 800000,
      premiumINR: 12000,
      duration: '1 year'
    },
    {
      id: 3,
      name: <strong>Liability Insurance</strong>,
      description: (
        <ul>
          <li><strong>Bodily Injury Coverage:</strong> Liability insurance covers bodily injury and property damage that you may cause to others while driving your vehicle.</li>
          <li><strong>Legal Protection:</strong> It provides legal protection by covering the costs of legal fees, settlements, or judgments if you are sued for causing an accident.</li>
          <li><strong>Financial Responsibility:</strong> Liability insurance helps fulfill your financial responsibility for injuries or damages resulting from accidents where you are at fault.</li>
          <li><strong>State Requirements:</strong> Liability insurance is often required by law in most states, ensuring that drivers have coverage to compensate others for injuries or damages they cause.</li>
          <li><strong>Peace of Mind:</strong> Having liability insurance offers peace of mind while driving, knowing that you are financially protected against unforeseen accidents or incidents.</li>
        </ul>
      ),
      coverageAmount: 500000,
      premiumINR: 8000,
      duration: '1 year'
    }
  ];

  const [vehicleCost, setVehicleCost] = useState('');
  const [manufacturingYear, setManufacturingYear] = useState('');
  const [expandedTypes, setExpandedTypes] = useState([]); // Initialize expandedTypes state
  const [planDetails, setPlanDetails] = useState(null);

  const toggleType = (typeId) => {
    if (expandedTypes.includes(typeId)) {
      setExpandedTypes(expandedTypes.filter((id) => id !== typeId));
    } else {
      setExpandedTypes([...expandedTypes, typeId]);
    }
  };

  const handleCalculateClick = () => {
    if (vehicleCost.trim() === '' || manufacturingYear.trim() === '') {
      alert('Please enter both Vehicle Cost and Year of Manufacturing.');
    } else {
      // Convert vehicleCost and manufacturingYear to numbers
      const cost = parseInt(vehicleCost);
      const year = parseInt(manufacturingYear);

      // Choose the appropriate plan based on vehicle cost and manufacturing year
      let chosenPlan = null;
      if (cost > 500000 && year >= 2020) {
        chosenPlan = VehicleInsuranceTypes.find(type => type.name.props.children === 'Comprehensive Insurance');
      } else if (cost > 300000 && year >= 2018) {
        chosenPlan = VehicleInsuranceTypes.find(type => type.name.props.children === 'Collision Insurance');
      } else {
        chosenPlan = VehicleInsuranceTypes.find(type => type.name.props.children === 'Liability Insurance');
      }

      // Set the chosen plan details
      setPlanDetails(chosenPlan);
    }
  };

  const formatCurrencyINR = (amount) => {
    // Assuming a simple conversion rate for demonstration
    const INR = amount * 75; // Assuming 1 USD = 75 INR
    return `₹${INR.toLocaleString()}`;
  };

  return (
    <div>
        <PageTitle title="Vehicle Insurance" />
    <div className="p-8">
      
      <h2 className="text-2xl font-bold mb-4">Description of Vehicle Insurance</h2>
      <p className="text-black">{VehicleInsuranceDescription}</p>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Types of Vehicle Insurance</h2>
        <ul>
          {VehicleInsuranceTypes.map((type) => (
            <li key={type.id}>
              <span className={`cursor-pointer ${expandedTypes.includes(type.id) ? 'font-bold text-gray-600' : 'text-black-500 hover:underline'}`}
                onClick={() => toggleType(type.id)}>
                {type.name}
              </span>
              {expandedTypes.includes(type.id) && (
                <p className="text-black mt-2">{type.description}</p>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Get Insurance Details</h2>
        <div className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Enter Vehicle Cost"
            className="border border-gray-300 p-2 rounded"
            value={vehicleCost}
            onChange={(e) => setVehicleCost(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter Year of Manufacturing"
            className="border border-gray-300 p-2 rounded"
            value={manufacturingYear}
            onChange={(e) => setManufacturingYear(e.target.value)}
          />
          <button
            className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
            onClick={handleCalculateClick}
          >
            Calculate
          </button>
        </div>
      </div>
      {planDetails && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Insurance Plan Details</h2>
          <p className="text-gray-600">
            <span className="font-bold">Plan Name:</span> {planDetails.name}
          </p>
          <p className="text-gray-600">
            <span className="font-bold">Coverage Amount:</span> {formatCurrencyINR(planDetails.coverageAmount)}
          </p>
          <p className="text-gray-600">
            <span className="font-bold">Premium Amount:</span> {formatCurrencyINR(planDetails.premiumINR)}
          </p>
          <p className="text-gray-600">
            <span className="font-bold">Duration:</span> {planDetails.duration}
          </p>
          <Link to={`/${planDetails.name.props.children.split(' ').join('')}`} className="text-gray-600 mt-2">
            <button className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded">
              Buy Plan
            </button>
          </Link>
        </div>
      )}
    </div>
    </div>
  );
};

export default VehicleInsurance;
