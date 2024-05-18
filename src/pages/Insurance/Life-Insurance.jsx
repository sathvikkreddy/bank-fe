import React, { useState } from 'react';
import PageTitle from '../../components/PageTitle';

const LifeInsurance = () => {
  const lifeInsuranceDescription = `Life insurance provides financial protection to your loved ones in the event of your death. It ensures that your beneficiaries receive a lump sum payment, known as the death benefit, which can help cover expenses such as funeral costs, mortgage payments, and living expenses. There are various types of life insurance policies available, each offering different benefits and features.`;

  const lifeInsuranceTypes = [
    {
      id: 1,
      name: <strong>1. Term Life Insurance</strong>,
      description: (
        <ul>
          <li><strong>Coverage Duration:</strong> Term life insurance provides coverage for a specific period, such as 10, 20, or 30 years.</li>
          <li><strong>Death Benefit:</strong> If the insured individual passes away during the policy term, the policy pays out a death benefit to the designated beneficiaries.</li>
          <li><strong>Affordable Premiums:</strong> Term life insurance typically offers lower premiums compared to whole life insurance, making it more accessible for many individuals.</li>
          <li><strong>No Cash Value:</strong> Unlike whole life insurance, term life insurance does not accumulate cash value over time.</li>
          <li><strong>Renewable:</strong> Some term life policies offer the option to renew the coverage at the end of the term, although premiums may increase with age.</li>
          <li><strong>Convertible:</strong> Many term life policies allow conversion to a permanent life insurance policy without the need for a medical exam.</li>
          <li><strong>Flexible Coverage Amounts:</strong> Policyholders can choose coverage amounts based on their needs, such as income replacement, mortgage protection, or education funding for dependents.</li>
          <li><strong>Ideal for Temporary Needs:</strong> Term life insurance is well-suited for covering temporary financial obligations, such as paying off a mortgage or providing for children until they become financially independent.</li>
          <li><strong>Financial Protection:</strong> It provides peace of mind by ensuring that loved ones are financially protected in the event of the policyholder's untimely death during the coverage period.</li>
        </ul>
      )
    },
    {
      id: 2,
      name: <strong>2. Whole Life Insurance</strong>,
      description: (
        <ul>
          <li><strong>Lifetime Coverage:</strong> Whole life insurance provides coverage for the entire life of the insured.</li>
          <li><strong>Death Benefit:</strong> It includes a death benefit paid out to beneficiaries upon the insured's death.</li>
          <li><strong>Cash Value:</strong> Whole life policies accumulate cash value over time, which can be accessed by the policyholder through withdrawals or loans.</li>
          <li><strong>Guaranteed Premiums:</strong> Premiums remain consistent throughout the policyholder's life, providing stability and predictability.</li>
          <li><strong>Policy Loans:</strong> Policyholders can borrow against the cash value of the policy, offering a source of liquidity.</li>
          <li><strong>Asset Protection:</strong> Whole life insurance can serve as an asset protection tool, shielding cash value from creditors in some jurisdictions.</li>
          <li><strong>Estate Planning:</strong> It can be used as part of an estate planning strategy to provide inheritance for beneficiaries or pay estate taxes.</li>
        </ul>
      )
    },
    {
      id: 3,
      name: <strong>3. Universal Life Insurance</strong>,
      description: (
        <ul>
          <li><strong>Flexible Premiums:</strong> Universal life insurance allows policyholders to adjust premium payments and coverage amounts over time.</li>
          <li><strong>Adjustable Death Benefit:</strong> Policyholders can modify the death benefit amount based on changing needs, such as family size or financial obligations.</li>
          <li><strong>Cash Value Accumulation:</strong> Like whole life insurance, universal life policies accumulate cash value over time, offering a source of savings or investment.</li>
          <li><strong>Interest-Earning Account:</strong> Cash value in universal life policies typically earns interest at a variable rate set by the insurer.</li>
          <li><strong>Flexible Policy Loans:</strong> Policyholders can borrow against the cash value of the policy, often at competitive interest rates.</li>
          <li><strong>No Lapse Guarantee:</strong> Some universal life policies offer a no-lapse guarantee, ensuring coverage remains in force as long as the required premiums are paid.</li>
          <li><strong>Tax-Advantaged:</strong> Universal life insurance offers potential tax advantages, such as tax-deferred growth of cash value and tax-free death benefits for beneficiaries.</li>
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
        <PageTitle title="Life Insurance" />
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Description of Life Insurance</h2>
        <p className="text-black">{lifeInsuranceDescription}</p>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Types of Life Insurance</h2>
        <ul>
          {lifeInsuranceTypes.map((type) => (
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
          onClick={() => alert('Register for New Insurance Policy')}
        >
          Register for New Insurance Policy
        </button>
      </div>

    </div>
  );
};

export default LifeInsurance;


