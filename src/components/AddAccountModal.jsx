import React, { useState } from "react";
import Modal from "./Modal";
import { validateFirstName } from "../inputValidators";
import axios from "axios";
import updateOutletContext from "../utils/updateOutletContext";
import { useOutletContext } from "react-router-dom";

const AddAccountModal = ({ open, onClose }) => {
  const [accountName, setAccountName] = useState("");
  const [valid, setValid] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [
    profile,
    isLoading,
    transactions,
    setProfile,
    setIsLoading,
    setTransactions,
  ] = useOutletContext();

  const handleClose = () => {
    setAccountName("");
    setValid(true);
    setError("");
    setLoading(false);
    onClose();
  };

  const addAccount = async () => {
    const reqBody = {
      accountName,
    };
    try {
      const token = localStorage.getItem("authorization");
      if (!token) throw new Error("Unauthorized: Token not found");
      setLoading(true);
      const userResponse = await axios.post(
        "https://techbuzzers.somee.com/CreateBankAccount",
        reqBody,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      handleClose();
      updateOutletContext(setProfile, setTransactions, setIsLoading);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err.response.data);
    }
  };
  return (
    <Modal open={open} onClose={onClose}>
      <div className="text-2xl font-semibold text-c500 text-center px-6 py-4 min-w-96">
        Add New Account
      </div>
      <div className="px-6">
        <div className="py-1">
          Account Name:{" "}
          {!valid ? (
            <span className="text-sm text-red-500 px-2">
              * must be 3-15 letters
            </span>
          ) : (
            ""
          )}
        </div>
        <input
          className="p-2 border rounded-md w-full bg-c50 dark:text-white dark:bg-transparent focus:ring-c500 focus:border-c500"
          type="text"
          onChange={(e) => {
            setAccountName(e.target.value);
            validateFirstName(e.target.value)
              ? setValid(true)
              : setValid(false);
          }}
          value={accountName}
          placeholder="Enter a unique account name"
        />
        <div className="flex gap-4 w-full py-4">
          <button
            disabled={loading}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md bg-teal-500 cursor-${
              loading ? "not-allowed" : "pointer"
            } shadow-sm text-sm font-medium dark:text-white bg-teal-300 hover:bg-teal-400 dark:bg-teal-700 dark:hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-c500`}
            onClick={handleClose}
          >
            Close
          </button>
          <button
            disabled={!valid || loading || accountName === ""}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md bg-teal-500 cursor-${
              !valid || loading || accountName === ""
                ? "not-allowed"
                : "pointer"
            } shadow-sm text-sm font-medium dark:text-white bg-teal-300 hover:bg-teal-400 dark:bg-teal-700 dark:hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-c500`}
            onClick={addAccount}
          >
            {loading ? "Adding" : "Add"}
          </button>
        </div>
        <div className="text-red-500 text center">{error}</div>
      </div>
    </Modal>
  );
};

export default AddAccountModal;
