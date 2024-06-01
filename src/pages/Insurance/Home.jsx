import React, { useState, useEffect } from "react";
import { Link, useOutletContext, useNavigate } from "react-router-dom";
import PageTitle from "../../components/PageTitle";
import Card from "../../components/Card"; // Import the Card component
import LoadingSpinner from "../../components/LoadingSpinner";
import Button from "../../components/Button";
import toast from "react-hot-toast";
import axios from "axios";
import { applyInsurance } from "../../utils/applyInsurance";
import { fetchActiveInsurances } from "../../utils/fetchActiveInsurances";

const MainInsurance = ({ activeInsurances, availableInsurances, activeLoading, setActiveLoading, availableLoading, setActiveInsurances }) => {
  const [profile] = useOutletContext();

  const initialFields = {
    insurancePolicyId: "",
    uniqueIdentificationNumber: "",
    yearOfPurchase: "",
    purchaseAmount: "",
    userAccountId: profile.accounts[0].id,
    pin: "",
  };

  const [fields, setFields] = useState({
    insurancePolicyId: "",
    uniqueIdentificationNumber: "",
    yearOfPurchase: "",
    purchaseAmount: "",
    userAccountId: profile.accounts[0].id,
    pin: "",
  });
  const [showVehicleForm, setShowVehicleForm] = useState(false);
  const [showHomeForm, setShowHomeForm] = useState(false);
  const [applyLoading, setApplyLoading] = useState(false);
  const [showAllActive, setShowAllActive] = useState(false);

  const VehicleFormFieldsTitles = {
    title: "Vehicle Insurance",
    uniqueIdentificationNumber: "Vehicle Number",
    yearOfPurchase: "Purchase Year",
    purchaseAmount: "Cost of Vehicle",
    userAccountId: "Account Id",
    pin: "Enter Pin",
  };

  const HomeFormFieldsTitles = {
    title: "Home Insurance",
    uniqueIdentificationNumber: "Registration Number",
    yearOfPurchase: "Registration Year",
    purchaseAmount: "Market Value",
    userAccountId: "Account Id",
    pin: "Enter Pin",
  };

  const handleChange = (name, value) => {
    let c = { ...fields, [name]: value, insurancePolicyId: showHomeForm ? "IPN000002" : "IPN000001" };
    setFields(c);
  };

  const handleApply = async () => {
    const reqBody = {
      insurancePolicyId: fields.insurancePolicyId,
      uniqueIdentificationNumber: fields.uniqueIdentificationNumber,
      yearOfPurchase: Number(fields.yearOfPurchase),
      purchaseAmount: Number(fields.purchaseAmount),
      userAccountId: fields.userAccountId,
      pin: Number(fields.pin),
    };
    setApplyLoading(true);
    const response = await applyInsurance(reqBody);
    setApplyLoading(false);
    if (response.status < 300) {
      toast.success("Insurance Applied");
    } else {
      toast.error(response.data);
      return;
    }
    setActiveLoading(true);
    const activeInsurances = await fetchActiveInsurances();
    setActiveLoading(false);
    if (!activeInsurances) {
      toast.error("Error while fetching active insurances");
      return;
    }
    setActiveInsurances(activeInsurances);
  };

  const handleCancel = () => {
    setShowHomeForm(false);
    setShowVehicleForm(false);
  };

  return (
    <div>
      <PageTitle title="Insurance" />
      <div className="p-8">
        <Card
          title={
            <div className="grid sm:grid-cols-6 grid-cols-5">
              <div className="flex items-center text-nowrap sm:col-span-5 col-span-4 ">Active Insurances</div>
              <Button
                title={showAllActive ? "See less" : "See more"}
                onClick={() => {
                  setShowAllActive(!showAllActive);
                }}
              />
            </div>
          }
        >
          {activeLoading ? (
            <div className="flex justify-center items-center">
              <LoadingSpinner />
            </div>
          ) : activeInsurances.length < 1 ? (
            <div className="h-32 flex justify-center items-center">No active insurances, Apply for available insurances</div>
          ) : (
            <div className="grid sm:grid-cols-3 grid-cols-1 gap-2">
              {activeInsurances.slice(0, showAllActive ? activeInsurances.length + 1 : 3).map((insuranceObj) => {
                return (
                  <div key={insuranceObj.insurance.id}>
                    <ActiveInsuranceCard insurance={insuranceObj.insurance} title={insuranceObj.insuranceType} />
                  </div>
                );
              })}
            </div>
          )}
        </Card>

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Available Insurances</h2>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div
              onClick={() => {
                setShowVehicleForm(false);
                setShowHomeForm(true);
                setFields(initialFields);
              }}
              className={`py-4 rounded-lg text-center ${showHomeForm ? "bg-gray-100" : ""} border border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mb-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
              </svg>
              <span>Home Insurance</span>
            </div>
            <div
              onClick={() => {
                setShowHomeForm(false);
                setShowVehicleForm(true);
                setFields(initialFields);
              }}
              className={`py-4 rounded-lg text-center ${showVehicleForm ? "bg-gray-100" : ""} hover:bg-gray-100 border border-gray-300 flex flex-col items-center justify-center cursor-pointer`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mb-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
              </svg>
              <span>Vehicle Insurance</span>
            </div>
          </div>
          {showVehicleForm ? <Form fields={fields} handleChange={handleChange} handleApply={handleApply} handleCancel={handleCancel} fieldsTitles={VehicleFormFieldsTitles} /> : showHomeForm ? <Form fields={fields} handleChange={handleChange} handleApply={handleApply} handleCancel={handleCancel} fieldsTitles={HomeFormFieldsTitles} /> : null}
        </div>
      </div>
    </div>
  );
};

export default MainInsurance;

const Form = ({ fields, handleChange, handleApply, fieldsTitles, handleCancel }) => {
  const [profile] = useOutletContext();
  const [showCoverage, setShowCoverage] = useState(false);
  const [coverageDetails, setCoverageDetails] = useState("");
  const [selectedAccount, setSelectedAccount] = useState(profile.accounts[0]);
  const [coverageDetailsLoading, setCoverageDetailsLoading] = useState(false);

  const getCoverageDetails = async (reqBody) => {
    try {
      const token = localStorage.getItem("authorization");
      if (!token) throw new Error("Unauthorized: Token not found");
      const userResponse = await axios.post("https://techbuzzers.somee.com/calculateAmountCovered", reqBody, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setShowCoverage(true);
      setCoverageDetailsLoading(false);
      return userResponse.data;
    } catch (error) {
      setShowCoverage(false);
      setCoverageDetailsLoading(false);
      console.log(error);
      toast.error("Unable to get coverage amount");
    }
  };

  return (
    <div className="flex flex-col gap-2 border shadow-md rounded-md p-2">
      <div className="text-2xl border-b border-gray-300 p-2">{fieldsTitles.title}</div>
      <div>
        <span className="font-medium mr-2">{fieldsTitles.uniqueIdentificationNumber}: </span>
        <input
          className="border p-2 rounded-md w-full"
          type="text"
          value={fields.uniqueIdentificationNumber}
          onChange={(e) => {
            handleChange("uniqueIdentificationNumber", e.target.value);
          }}
          placeholder={fieldsTitles.title === "Vehicle Insurance" ? "TS01AB1234" : "REG878W287"}
        />
      </div>
      <div>
        <span className="font-medium mr-2">{fieldsTitles.yearOfPurchase}: </span>
        <input
          className="border p-2 rounded-md focus:border-black w-full"
          type="text"
          value={fields.yearOfPurchase}
          onChange={(e) => {
            handleChange("yearOfPurchase", e.target.value);
          }}
          placeholder="2024"
        />
      </div>
      <div className="sm:grid sm:grid-cols-8 flex flex-col gap-2 sm:gap-2">
        <div className="font-medium grid items-center text-nowrap">{fieldsTitles.purchaseAmount}: </div>
        <input
          className="border p-2 rounded-md focus:border-black sm:col-span-2 sm:w-full w-52"
          type="text"
          value={fields.purchaseAmount}
          onChange={(e) => {
            handleChange("purchaseAmount", e.target.value);
          }}
          placeholder="100000"
        />

        <Button
          title={"Get Coverage Details"}
          loading={coverageDetailsLoading}
          loadingTitle={"loading..."}
          className={"sm:col-span-2"}
          onClick={async () => {
            setCoverageDetailsLoading(true);
            const details = await getCoverageDetails({
              insurancePolicyId: fields.insurancePolicyId,
              uniqueIdentificationNumber: fields.uniqueIdentificationNumber,
              yearOfPurchase: fields.yearOfPurchase,
              purchaseAmount: fields.purchaseAmount,
            });
            setCoverageDetails(details);
          }}
        />
      </div>
      {showCoverage ? (
        <div className="flex justify-around border border-gray-300 p-2">
          <div className="font-medium mr-2">Coverage Amount: {coverageDetails ? coverageDetails.amountCovered : ""}</div>
          <div className="font-medium mr-2">Yearly Premium: {coverageDetails ? coverageDetails.installMentAmount : ""}</div>
        </div>
      ) : null}
      <div>
        <span className="font-medium mr-2">{fieldsTitles.userAccountId}: </span>
        <select
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          id="transaction-type"
          value={selectedAccount.id}
          onChange={(e) => {
            handleChange("userAccountId", e.target.value);
            setSelectedAccount({ id: e.target.value, name: e.target.options[e.target.selectedIndex].text });
          }}
        >
          {profile.accounts.map((account, index) => (
            <option key={index} value={account.id}>
              {account.accountName}
            </option>
          ))}
        </select>
      </div>
      <div>
        <span className="font-medium mr-2">{fieldsTitles.pin}: </span>
        <input
          className="border p-2 rounded-md focus:border-black w-full"
          type="password"
          value={fields.pin}
          onChange={(e) => {
            handleChange("pin", e.target.value);
          }}
          placeholder="xxxx"
        />
      </div>
      <div className="flex justify-around gap-4">
        <Button title={"Apply"} onClick={handleApply} />
        <Button title={"Cancel"} onClick={handleCancel} />
      </div>
    </div>
  );
};

const ActiveInsuranceCard = ({ insurance, title }) => {
  const navigate = useNavigate();

  const convertToDate = (isoString) => {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth() is zero-based
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  return (
    <div
      className="border flex flex-col gap-1 p-2 rounded-lg cursor-pointer hover:bg-gray-100"
      onClick={() => {
        navigate(`/insurance/${insurance.id}`);
      }}
    >
      <div className="font-semibold sm:text-lg text-sm text-center border-b">{title}</div>
      <div className="font-semibold sm:text-base text-xs">
        {title === "Vehicle Insurance" ? "Vehicle Number" : "Registration Number"}: <span className="font-normal">{insurance.uniqueIdentificationNumber}</span>
      </div>
      <div className="font-semibold sm:text-base text-xs">
        Coverage Amount: <span className="font-normal">{insurance.amountCovered}</span>
      </div>
      <div className="font-semibold sm:text-base text-xs">
        Validity: <span className="font-normal">{convertToDate(insurance.valididTill)}</span>
      </div>
      <div className="font-semibold sm:text-base text-xs">
        Yearly Premium: <span className="font-normal">{insurance.installmentAmount}</span>
      </div>
    </div>
  );
};
