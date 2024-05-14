import React, { useState } from 'react';
import PageTitle from '../../components/PageTitle';

const HealthInsurance = () => {
  const healthInsuranceDescription = `Health insurance provides coverage for medical expenses incurred due to illness or injury. It helps individuals and families afford healthcare services, including doctor visits, hospital stays, prescription medications, and preventive care. There are various types of health insurance plans available, each offering different levels of coverage and cost-sharing arrangements.`;

  const healthInsuranceTypes = [
    {
      id: 1,
      name: <strong>1. Health Maintenance Organization (HMO)</strong>,
      description: (
        <ul>
          <li><strong>Primary Care Physician (PCP):</strong> HMO plans require members to choose a primary care physician (PCP) who coordinates their healthcare services.</li>
          <li><strong>Referrals:</strong> Members typically need a referral from their PCP to see specialists or receive certain medical services.</li>
          <li><strong>Network:</strong> HMO plans have a network of healthcare providers, and coverage is usually limited to services received within the network.</li>
          <li><strong>Costs:</strong> HMO plans often have lower premiums and out-of-pocket costs but may have restrictions on healthcare provider choices.</li>
          <li><strong>Preventive Care:</strong> HMO plans often emphasize preventive care and wellness programs to keep members healthy and reduce long-term healthcare costs.</li>
        </ul>
      )
    },
    {
      id: 2,
      name: <strong>2. Preferred Provider Organization (PPO)</strong>,
      description: (
        <ul>
          <li><strong>Network:</strong> PPO plans have a network of preferred providers, but members have the flexibility to see out-of-network providers at a higher cost.</li>
          <li><strong>No Referrals:</strong> Members do not need referrals to see specialists or receive medical services outside of their primary care physician.</li>
          <li><strong>Costs:</strong> PPO plans typically have higher premiums and out-of-pocket costs compared to HMO plans but offer greater flexibility in choosing healthcare providers.</li>
          <li><strong>Out-of-Network Coverage:</strong> While PPO plans provide coverage for out-of-network services, members usually pay more out of pocket for these services.</li>
          <li><strong>Preauthorization:</strong> Some services may require preauthorization from the insurance company to ensure coverage.</li>
        </ul>
      )
    },
    {
      id: 3,
      name: <strong>3. Exclusive Provider Organization (EPO)</strong>,
      description: (
        <ul>
          <li><strong>Network:</strong> EPO plans offer coverage for services received within the plan's network of providers, similar to HMO plans.</li>
          <li><strong>No Referrals:</strong> Like PPO plans, EPO plans do not require referrals to see specialists or receive medical services.</li>
          <li><strong>Costs:</strong> EPO plans may have lower premiums compared to PPO plans but typically do not cover out-of-network services except in emergency situations.</li>
          <li><strong>Provider Choice:</strong> Members must receive care from within the plan's network of providers, except in emergencies.</li>
          <li><strong>Out-of-Network Coverage:</strong> EPO plans generally do not cover out-of-network services, except for emergencies, which may require prior authorization.</li>
        </ul>
      )
    }
  ];

  const [expandedTypes, setExpandedTypes] = useState([]);

  const toggleType = (typeId) => {
    if (expandedTypes.includes(typeId)) {
      setExpandedTypes(expandedTypes.filter((id) => id !== typeId));
    } else {
      setExpandedTypes([...expandedTypes, typeId]);
    }
  };

  return (
    <div className="p-8 leading-relaxed">
        <PageTitle title="Health Insurance" />
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Description of Health Insurance</h2>
        <p className="text-black">{healthInsuranceDescription}</p>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Types of Health Insurance</h2>
        <ul>
          {healthInsuranceTypes.map((type) => (
            <li key={type.id}>
              <span
                className={`cursor-pointer ${expandedTypes.includes(type.id) ? 'font-bold text-gray-600' : 'text-black-500 hover:underline'}`}
                onClick={() => toggleType(type.id)}
              >
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
        <button
          className="text-black border border-black hover:border-gray-800 font-bold py-2 px-4 rounded"
          onClick={() => alert('Register for New Health Insurance Policy')}
        >
          Register for New Health Insurance Policy
        </button>
      </div>

    </div>
  );
};

export default HealthInsurance;


