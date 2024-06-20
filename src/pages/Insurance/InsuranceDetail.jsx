import React, { useState, useEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";
import PageTitle from "../../components/PageTitle";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import axios from "axios";
import NotFound from "../NotFound";

const InsuranceDetail = ({ activeInsurances, activeLoading }) => {
  const { id } = useParams();
  const [currentInsurance, setCurrentInsurance] = useState(null);
  const [selectedTab, setSelectedTab] = useState("due");
  const [installmentsLoading, setInstallmentsLoading] = useState(false);
  const [installments, setInstallments] = useState(null);

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const convertToDate = (isoString) => {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth() is zero-based
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  const filterByInsuranceId = (data, insuranceId) => {
    return {
      pending: data.pending.filter((item) => item.insuranceId === insuranceId),
      due: data.due.filter((item) => item.insuranceId === insuranceId),
      paid: data.paid.filter((item) => item.insuranceId === insuranceId),
    };
  };

  // const installments = {
  //   pending: [
  //     {
  //       id: "IIN21086614",
  //       insuranceId: "INO28952577",
  //       installmentYear: 2,
  //       installmentAmount: 15,
  //       dueDate: "2025-05-28T16:38:04.4308566",
  //       status: "Pending",
  //     },
  //     {
  //       id: "IIN71650745",
  //       insuranceId: "INO28952577",
  //       installmentYear: 3,
  //       installmentAmount: 15,
  //       dueDate: "2026-05-28T16:38:04.4308566",
  //       status: "Pending",
  //     },
  //   ],
  //   due: [
  //     {
  //       id: "IIN21086614",
  //       insuranceId: "INO28952577",
  //       installmentYear: 2,
  //       installmentAmount: 15,
  //       dueDate: "2025-05-28T16:38:04.4308566",
  //       status: "Due",
  //     },
  //     {
  //       id: "IIN71650745",
  //       insuranceId: "INO28952577",
  //       installmentYear: 3,
  //       installmentAmount: 15,
  //       dueDate: "2026-05-28T16:38:04.4308566",
  //       status: "Due",
  //     },
  //   ],
  //   paid: [
  //     {
  //       id: "IIN21086614",
  //       insuranceId: "INO28952577",
  //       installmentYear: 2,
  //       installmentAmount: 15,
  //       dueDate: "2025-05-28T16:38:04.4308566",
  //       status: "Paid",
  //     },
  //     {
  //       id: "IIN71650745",
  //       insuranceId: "INO28952577",
  //       installmentYear: 3,
  //       installmentAmount: 15,
  //       dueDate: "2026-05-28T16:38:04.4308566",
  //       status: "Paid",
  //     },
  //   ],
  // };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInstallment, setSelectedInstallment] = useState(null);

  const handleOpenModal = (installment) => {
    setSelectedInstallment(installment);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedInstallment(null);
  };

  useEffect(() => {
    if (!activeLoading) {
      const foundInsurance = activeInsurances.find(
        (insuranceObj) => insuranceObj.insurance.id === id
      );
      setCurrentInsurance(foundInsurance || null);
    }
  }, [id, activeInsurances, activeLoading]);

  useEffect(() => {
    try {
      const token = localStorage.getItem("authorization");
      if (!token) throw new Error("Unauthorized: Token not found");
      setInstallmentsLoading(true);
      const userResponse = axios
        .get("https://techbuzzers.somee.com/getAllInsuranceInstallments", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const filteredData = filterByInsuranceId(response.data, id);
          setInstallments(filteredData);
          setInstallmentsLoading(false);
        });
    } catch (err) {
      setInstallmentsLoading(false);
      console.log(err.message);
    }
  }, []);

  if (activeLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!currentInsurance) return <NotFound />;

  return (
    <div>
      <PageTitle title={currentInsurance.insuranceType} />
      <div className="grid grid-cols-2 border border-gray-300 dark:border-gray-600 shadow-md dark:shadow-slate-600 rounded-md m-2 p-2">
        <div className="sm:grid sm:grid-cols-2 gap-2 py-2">
          <div className="font-medium">INSURANCE ID :</div>
          <div className="">{currentInsurance.insurance.id}</div>
        </div>
        <div className="sm:grid sm:grid-cols-2 gap-2 py-2">
          <div className="font-medium">INSURANCE POLICY ID :</div>
          <div className="">{currentInsurance.insurance.insurancePolicyId}</div>
        </div>
        <div className="sm:grid sm:grid-cols-2 gap-2 py-2">
          <div className="font-medium">
            {currentInsurance.insuranceType === "Vehicle Insurance"
              ? "VEHICLE REGISTRATION NUMBER"
              : "REGISTRATION NUMBER"}{" "}
            :{" "}
          </div>
          <div className="">
            {currentInsurance.insurance.uniqueIdentificationNumber}
          </div>
        </div>
        <div className="sm:grid sm:grid-cols-2 gap-2 py-2">
          <div className="font-medium">
            {currentInsurance.insuranceType === "Vehicle Insurance"
              ? "VEHICLE MODEL YEAR"
              : "REGISTRATION YEAR"}{" "}
            :{" "}
          </div>
          <div className="">{currentInsurance.insurance.yearOfPurchase}</div>
        </div>
        <div className="sm:grid sm:grid-cols-2 gap-2 py-2">
          <div className="font-medium">
            {currentInsurance.insuranceType === "Vehicle Insurance"
              ? "COST OF VEHICLE"
              : "MARKET VALUE"}{" "}
            :{" "}
          </div>
          <div className="">{currentInsurance.insurance.purchaseAmount}</div>
        </div>
        <div className="sm:grid sm:grid-cols-2 gap-2 py-2">
          <div className="font-medium">COVERAGE AMOUNT : </div>
          <div className="">{currentInsurance.insurance.amountCovered}</div>
        </div>
        <div className="sm:grid sm:grid-cols-2 gap-2 py-2">
          <div className="font-medium">VALIDITY DATE : </div>
          <div className="">
            {convertToDate(currentInsurance.insurance.valididTill)}
          </div>
        </div>
        <div className="sm:grid sm:grid-cols-2 gap-2 py-2">
          <div className="font-medium">YEARLY PREMIUM : </div>
          <div className="">
            {currentInsurance.insurance.installmentAmount} INR
          </div>
        </div>
      </div>
      <div className="border border-gray-300 dark:border-gray-600 shadow-md dark:shadow-slate-600 rounded-md m-2 p-2 flex flex-col gap-4">
        <div className="text-xl font-medium uppercase mt-2">Premiums</div>
        <div className="flex space-x-4 border border-gray-300 dark:border-gray-600 p-1 rounded-md shadow-md dark:shadow-slate-600">
          <button
            className={`px-4 py-2 ${
              selectedTab === "due" ? "bg-c500" : "dark:bg-c700 bg-c300"
            } hover:bg-c600 rounded`}
            onClick={() => handleTabChange("due")}
          >
            Due
          </button>
          <button
            className={`px-4 py-2 ${
              selectedTab === "pending" ? " bg-c500 " : "dark:bg-c700 bg-c300"
            } hover:bg-c600 rounded`}
            onClick={() => handleTabChange("pending")}
          >
            Upcoming
          </button>
          <button
            className={`px-4 py-2 ${
              selectedTab === "paid" ? " bg-c500 " : "dark:bg-c700 bg-c300"
            } hover:bg-c600 rounded`}
            onClick={() => handleTabChange("paid")}
          >
            Paid
          </button>
        </div>
        {installmentsLoading ? (
          <LoadingSpinner />
        ) : (
          <InstallmentTable
            type={selectedTab}
            installments={installments[selectedTab]}
            handleOpenModal={handleOpenModal}
          />
        )}
      </div>
      <InstallmentPaymentModal
        open={isModalOpen}
        onClose={handleCloseModal}
        installment={selectedInstallment}
      />
    </div>
  );
};

export default InsuranceDetail;

const InstallmentTable = ({ type, installments, handleOpenModal }) => {
  if (installments.length < 1) {
    return <div className="uppercase m-2 ">No {type} Premiums</div>;
  }
  return (
    <div className="overflow-x-auto rounded-md">
      <table className="min-w-full border dark:border-gray-600 border-gray-300">
        <thead>
          <tr className="bg-gray-200 dark:bg-gray-700 leading-normal">
            <th className="py-3 sm:px-6 px-1 text-left">Premium ID</th>
            <th className="py-3 sm:px-6 px-1 text-left">Premium Year</th>
            <th className="py-3 sm:px-6 px-1 text-left">Premium Amount</th>
            <th className="py-3 sm:px-6 px-1 text-left">Status</th>
          </tr>
        </thead>
        <tbody className="">
          {installments.map((installment) => (
            <tr
              key={installment.id}
              className="border-b dark:border-b-gray-600 border-gray-200 dark:bg-gray-800"
            >
              <td className="py-3 sm:px-6 px-1 text-left">{installment.id}</td>
              <td className="py-3 sm:px-6 px-1 text-left">
                {installment.installmentYear}
              </td>
              <td className="py-3 sm:px-6 px-1 text-left">
                {installment.installmentAmount} INR
              </td>
              <td className="py-3 sm:px-6 px-1 text-left">
                {installment.status === "Due" ? (
                  <Button
                    title={"Pay"}
                    onClick={() => {
                      handleOpenModal(installment);
                    }}
                  ></Button>
                ) : (
                  installment.status
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const InstallmentPaymentModal = ({ installment, open, onClose }) => {
  const [profile] = useOutletContext();

  const [pin, setPin] = useState("");
  const [selectedAccount, setSelectedAccount] = useState(
    profile.accounts[0].id
  );

  const handlePay = () => {
    const reqBody = {
      installmentId: installment.id,
      accountId: selectedAccount,
      pin: Number(pin),
    };
    console.log(reqBody);
    setPin("");
    setSelectedAccount(profile.accounts[0].id);
  };

  const handleClose = () => {
    setPin("");
    setSelectedAccount(profile.accounts[0].id);
    onClose();
  };
  return (
    installment && (
      <Modal open={open} onClose={onClose}>
        <div className="text-2xl font-semibold text-center px-6 py-4 min-w-96">
          Pay Premium
        </div>
        <div className="font-medium p-2">Premium ID : {installment.id}</div>
        <div className="font-medium p-2">
          Premium Amount: {installment.installmentAmount} INR
        </div>
        <div className="p-2">
          <span className="font-medium mr-2">Select Account : </span>
          <select
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            id="transaction-type"
            value={selectedAccount}
            onChange={(e) => {
              console.log(e.target.value);
              setSelectedAccount(e.target.value);
            }}
          >
            {profile.accounts.map((account, index) => (
              <option key={index} value={account.id}>
                {account.accountName}
              </option>
            ))}
          </select>
        </div>
        <span className="font-medium p-2">Enter Pin: </span>
        <input
          type="password"
          value={pin}
          onChange={(e) => {
            setPin(e.target.value);
          }}
          className="font-medium p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:border-black dark:focus:border-white"
          placeholder="xxxx"
        />
        <div className="pt-4 px-2 flex justify-around gap-4">
          <Button title={"Pay"} onClick={handlePay} />
          <Button title={"Cancel"} onClick={handleClose} />
        </div>
      </Modal>
    )
  );
};
