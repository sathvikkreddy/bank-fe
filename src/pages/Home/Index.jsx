import React, { useEffect, useState } from "react";
import Card from "../../components/Card";
import PageTitle from "../../components/PageTitle";
import Button from "../../components/Button";
import Dropdown from "../../components/Dropdown";
import { useOutletContext } from "react-router-dom";
import { capitalize } from "../../utils/stringUtils";
import { BalancesChart } from "../../components/BalancesChart";
import AddAccountModal from "../../components/AddAccountModal";
import updateOutletContext from "../../utils/updateOutletContext";
import axios from "axios";
const Home = () => {
  const [
    profile,
    isLoading,
    transactions,
    setProfile,
    setIsLoading,
    setTransactions,
  ] = useOutletContext();
  const [selectedAccount, setSelectedAccount] = useState(profile.accounts[0]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSetPrimary = async () => {
    const reqBody = {
      accountId: selectedAccount.id,
    };
    try {
      const token = localStorage.getItem("authorization");
      if (!token) throw new Error("Unauthorized: Token not found");
      setLoading(true);
      const userResponse = await axios.post(
        "https://techbuzzers.somee.com/SetPrimaryAccount",
        reqBody,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false);
      updateOutletContext(setProfile, setTransactions, setIsLoading);
    } catch (err) {
      setLoading(false);
    }
  };
  return (
    <div>
      <PageTitle title={"Dashboard"} />
      <div className="">
        <div className="sm:flex font-light text-2xl p-2">
          <div>{"Welcome, "}</div>{" "}
          <div className="font-semibold text-teal-500">
            {capitalize(profile.userDetails.firstName) +
              " " +
              capitalize(profile.userDetails.lastName)}
          </div>
        </div>
        <div className="sm:flex gap-4 justify-around p-2">
          <div className="sm:w-2/3 w-full h-full mb-2" name="chart">
            <Card title={"Your money this month"}>
              <BalancesChart
                transactions={transactions}
                selectedAccount={selectedAccount}
              />
            </Card>
          </div>
          <div className="sm:w-1/3 sm:flex sm:flex-col">
            <div className="sm:h-1/2 w-full sm:pb-2">
              <Card
                title={
                  <Dropdown
                    options={profile.accounts}
                    setSelectedAccount={setSelectedAccount}
                  />
                }
              >
                <div className="flex flex-col justify-between">
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
                  <div className="flex gap-2 mt-10" name="Buttons">
                    <div
                      aria-disabled={isLoading}
                      className={`${
                        selectedAccount.id === profile.primaryAccountId
                          ? "hidden"
                          : "block"
                      }`}
                    >
                      <Button
                        onClick={handleSetPrimary}
                        title={"Set as primary"}
                        loading={loading}
                        loadingTitle={"Setting"}
                      />
                    </div>
                    <div className="w-full">
                      <Button
                        onClick={() => {
                          setOpen(true);
                        }}
                        title={
                          <div className="flex">
                            <AddIcon />{" "}
                            <div className="hidden sm:block">Add new</div>
                          </div>
                        }
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </div>
            <div className="sm:h-1/2 sm:w-full ">
              <Card title="All Accounts">
                {profile.accounts.map((acc) => {
                  return (
                    <div key={acc.id} className="text-lg py-2">
                      {acc.accountName}{" "}
                      {acc.id === profile.primaryAccountId ? (
                        <span className="text-sm text-c500">
                          {"( Primary )"}
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                  );
                })}
              </Card>
            </div>
            <AddAccountModal
              open={open}
              onClose={() => {
                setOpen(false);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const AddIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-5 h-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>
  );
};

export default Home;
