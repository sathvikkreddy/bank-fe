import React, { useState } from "react";
import PageTitle from "../../components/PageTitle";
import Card from "../../components/Card";
import Dropdown from "../../components/Dropdown";
import Button from "../../components/Button";
import { useNavigate, useOutletContext } from "react-router-dom";
import AddAccountModal from "../../components/AddAccountModal";
import axios from "axios";
import updateOutletContext from "../../utils/updateOutletContext";
const Home = () => {
  const [profile, isLoading, transactions, setProfile, setIsLoading, setTransactions] = useOutletContext();
  const [open, setOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(profile.accounts[0]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSetPrimary = async () => {
    const reqBody = {
      accountId: selectedAccount.id,
    };
    try {
      const token = localStorage.getItem("authorization");
      if (!token) throw new Error("Unauthorized: Token not found");
      setLoading(true);
      const userResponse = await axios.post("https://techbuzzers.somee.com/SetPrimaryAccount", reqBody, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setLoading(false);
      updateOutletContext(setProfile, setTransactions, setIsLoading);
    } catch (err) {
      setLoading(false);
      setError(err.response.data);
    }
  };

  const compareTimestamps = (a, b) => {
    return new Date(a.timestamp) - new Date(b.timestamp);
  };
  const fakeLoans = [
    {
      id: "1",
      name: "Personal Loan",
      amount: "999999",
      due: 0,
      roi: 3,
      status: "open",
    },
    {
      id: "2",
      name: "Gold Loan",
      amount: "1000000",
      due: 0,
      roi: 6,
      status: "closed",
    },
    {
      id: "3",
      name: "Home Loan",
      amount: "999999",
      due: 0,
      roi: 3,
      status: "open",
    },
    {
      id: "4",
      name: "Bussiness Loan",
      amount: "999999",
      due: 0,
      roi: 3,
      status: "open",
    },
  ];
  const fakeInsurances = [
    {
      id: "9",
      name: "Personal Insurance",
      amount: "999999",
      due: 0,
      roi: 3,
      status: "open",
    },
    {
      id: "10",
      name: "Gold Insurance",
      amount: "1000000",
      due: 0,
      roi: 6,
      status: "closed",
    },
    {
      id: "11",
      name: "Home Insurance",
      amount: "999999",
      due: 0,
      roi: 3,
      status: "open",
    },
    {
      id: "12",
      name: "Bussiness Insurance",
      amount: "999999",
      due: 0,
      roi: 3,
      status: "open",
    },
  ];
  const sortedSelectedAccountTransactions = transactions.filter((txn) => txn.debitId === selectedAccount.id || txn.creditId === selectedAccount.id).sort(compareTimestamps);
  return (
    <div>
      <PageTitle title={"Accounts"} />
      <div className="grid grid-cols-3 w-full p-2 gap-2">
        <div className="" name="Account">
          <Card title={<Dropdown options={profile.accounts} setSelectedAccount={setSelectedAccount} />}>
            <div className="flex flex-col justify-between h-full">
              <div className="flex flex-col gap-4">
                <div className="text-grey-500 text-xl font-light">
                  <span className="font-semibold">ID: </span>
                  {selectedAccount.id}
                </div>
                <div className="text-grey-500 text-xl font-light">
                  <span className="font-semibold">Balance: </span>
                  {selectedAccount.balance}
                </div>
              </div>
              <div className="flex gap-2" name="Buttons">
                <div aria-disabled={isLoading} className={`${selectedAccount.id === profile.primaryAccountId ? "invisible w-0" : "w-3/5"}`}>
                  <Button onClick={handleSetPrimary} title={"Set as primary"} loading={loading} loadingTitle={"Setting"} />
                </div>
                <div className={`${selectedAccount.id === profile.primaryAccountId ? "w-full" : "w-2/5"}`}>
                  <Button
                    onClick={() => {
                      setOpen(true);
                    }}
                    title={
                      <div className="flex">
                        <AddIcon /> Add new
                      </div>
                    }
                  />
                </div>
              </div>
            </div>
          </Card>
        </div>
        <div className="col-span-2" name="Recent Activity">
          <Card title="All Accounts">
            {profile.accounts.map((acc) => {
              return (
                <div key={acc.id} className="text-lg py-2">
                  {acc.accountName} {acc.id === profile.primaryAccountId ? <span className="text-sm">{"( Primary )"}</span> : ""}
                </div>
              );
            })}
          </Card>
        </div>
      </div>
      <div className="p-2">
        <Card
          title={
            <div className="flex">
              <div className="w-5/6 grid items-center">Recent Activity</div>
              <div className="w-1/6">
                <Button title={"Show more"} />
              </div>
            </div>
          }
        >
          {sortedSelectedAccountTransactions.splice(0, 6).map((txn) => {
            const debit = selectedAccount.id === txn.debitId ? true : false;
            return <div key={txn.id} className="text-lg">{`${debit ? "Sent" : "Received"} Rs.${txn.amount} ${debit ? `to ${txn.creditId}` : `from ${txn.debitId}`} `}</div>;
          })}
        </Card>
      </div>
      <div>
        <AddAccountModal
          open={open}
          onClose={() => {
            setOpen(false);
          }}
        />
      </div>
    </div>
  );
};

export default Home;

const LoanCard = ({ loan }) => {
  return (
    <div className="grid grid-cols-6 gap-2 border-b">
      <div className="col-span-5">
        <div className="font-semibold text-xl">{loan.name}</div>
        <div>Amount: {loan.amount}</div>
        <div>Interest Rate: {loan.roi}</div>
        <div>Due: {loan.due}</div>
      </div>
      <div className="grid items-center justify-items-center bg-gray-200 my-1 rounded-lg">{loan.status}</div>
    </div>
  );
};

const AddIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  );
};
