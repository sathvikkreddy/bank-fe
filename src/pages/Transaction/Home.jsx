
import { useEffect, useState } from "react";
import axios from "axios";
import PageTitle from "../../components/PageTitle";
import { fetchUserTransactions } from "../../utils/fetchUserTransactions";

export default function Component() {
  const [receiverPhone, setReceiverPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [dateRangeFilter, setDateRangeFilter] = useState("");
  const [bankAccounts, setBankAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState({ id: "", type: "" });
  const [loading, setLoading] = useState(false);
  const [searchMessage, setSearchMessage] = useState("");
  const [searchMessageColor, setSearchMessageColor] = useState("");
  const [transferMessage, setTransferMessage] = useState("");
  const [transferMessageType, setTransferMessageType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 20;
  const phoneRegex = /^\d{10}$/;

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await fetchUserTransactions();
        setTransactions(data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };
    fetchTransactions();
  }, []);

  useEffect(() => {
    const fetchBankAccounts = async () => {
      try {
        const token = localStorage.getItem("authorization");
        if (!token) throw new Error("Unauthorized: Token not found");
        const userResponse = await axios.get("https://techbuzzers.somee.com/GetBankAccounts", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        return userResponse.data;
      } catch (error) {
        console.error("Error fetching bank accounts:", error);
        return [];
      }
    };
    const fetchAccounts = async () => {
      const accounts = await fetchBankAccounts();
      setBankAccounts(accounts);
    };
    fetchAccounts();
  }, []);

  const handleTransfer = async (e) => {
    e.preventDefault();
    if (!receiverPhone || !amount) {
      alert("Please fill all the details before transferring.");
      return;
    }
    if (!phoneRegex.test(receiverPhone)) {
      setTransferMessage("Receiver phone number must be 10 digits.");
      setTransferMessageType("error");
      return;
    }
    try {
      setLoading(true);
      const token = localStorage.getItem("authorization");
      if (!token) {
        throw new Error("Authorization token not found.");
      }
      const requestBody = {
        amount: Number(amount),
        senderAccountId: selectedAccount.id,
        receiverPhoneNumber: Number(receiverPhone),
      };
      const transferResponse = await axios.post(
        "https://techbuzzers.somee.com/Transfer",
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const newToken = transferResponse.data.token;
      if (newToken) {
        localStorage.setItem("authorization", newToken);
      }
      setTransferMessage(`Amount ${amount} transferred successfully!`);
      setTransferMessageType("success");
      const updatedTransactions = await fetchUserTransactions();
      setTransactions(updatedTransactions);
      setTimeout(() => {
        setTransferMessage("");
        setTransferMessageType("");
      }, 3000);
    } catch (error) {
      console.error("Transfer error:", error);
      setTransferMessage("Transfer failed. Please try again.");
      setTransferMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    try {
      const token = localStorage.getItem("authorization");
      if (!token) throw new Error("Unauthorized: Token not found");

      const response = await axios.get(
        `https://techbuzzers.somee.com/SearchUser?phone=${receiverPhone}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data && response.data.phoneNumber == receiverPhone) {
        setSearchMessage("User found");
        setSearchMessageColor("green");
      } else {
        setSearchMessage("User not found");
        setSearchMessageColor("red");
      }
      setTimeout(() => {
        setSearchMessage("");
        setSearchMessageColor("");
      }, 3000);
    } catch (err) {
      setSearchMessage("User not found");
      setSearchMessageColor("red");
    }
  };

  const handlePhoneChange = (e) => {
    const phone = e.target.value;
    setReceiverPhone(phone);
    if (!phone) {
      setSearchMessage("");
      setSearchMessageColor("");
    }
  };

  const filteredTransactions = transactions.filter((transaction) => {
    if (
      statusFilter &&
      statusFilter !== "All" &&
      transaction.status !== statusFilter
    ) {
      return false;
    }
    const transactionDate = new Date(transaction.timestamp);
    const filterDate = new Date(dateRangeFilter);
    const transactionMonthYearString = `${transactionDate.getMonth() + 1}/${transactionDate.getFullYear()}`;
    const filterMonthYearString = `${filterDate.getMonth() + 1}/${filterDate.getFullYear()}`;
    if (dateRangeFilter && transactionMonthYearString !== filterMonthYearString) {
      return false;
    }
    return true;
  });

  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = filteredTransactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <div>
      <PageTitle title={"Transactions"} />
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-950 rounded-lg shadow-md p-6">
          <div className="space-y-6 mb-6">
            <div className="flex items-center space-x-4">
            <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="receiver-phone">
             Receiver Phone Number</label>
            <div className="inline-block align-middle">
            <input
              className="w-48 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
              id="receiver-phone"
              placeholder="Enter Receiver's Phone Number"
              type="tel"
              value={receiverPhone}
              onChange={handlePhoneChange}
             />
            </div>
            <div className="inline-block align-middle ml-2">
            <button
            className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-md"
            onClick={handleSearch}>
            Search
            </button>
            </div>
            {receiverPhone && !phoneRegex.test(receiverPhone) && (
            <p className="text-red-500 text-sm">Receiver phone number must be 10 digits.</p>)}
            {searchMessage && (
            <p className={`text-sm ${searchMessageColor === "green" ? "text-green-500" : "text-red-500"}`}>
            {searchMessage}</p>)}
            </div>

            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="amount">
                  Amount
                </label>
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
                  id="amount"
                  placeholder="100.00"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="transaction-type">
                  Account
                </label>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
                  id="transaction-type"
                  value={selectedAccount.id}
                  onChange={(e) => setSelectedAccount({ id: e.target.value, name: e.target.options[e.target.selectedIndex].text })}>
                  <option value="">Select Account</option>
                  {bankAccounts.map((account, index) => (
                    <option key={index} value={account.id}>
                      {account.accountName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium invisible" htmlFor="transfer-button">
                  &nbsp;
                </label>
                <button
                  className="w-full bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-md"
                  onClick={handleTransfer}
                >
                  Transfer
                </button>
              </div>
            </div>
            {transferMessage && (
              <div className={`text-sm mt-4 ${transferMessageType === "success" ? "text-green-500" : "text-red-500"}`}>
                {transferMessageType === "success" ? (
                  <div>
                    <span>✔️ </span>
                    {transferMessage}
                  </div>
                ) : (
                  <div>
                    <span>❌ </span>
                    {transferMessage}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="bg-white dark:bg-gray-950 rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Transaction History</h2>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
                  id="status-filter"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}>
                  <option value="">Status</option>
                  <option value="pending">Pending</option>
                  <option value="failed">Failed</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div className="relative">
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
                  id="date-range-filter"
                  type="month"
                  value={dateRangeFilter}
                  onChange={(e) => setDateRangeFilter(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800">
                  <th className="px-4 py-2 text-left text-sm font-medium">S.No.</th>
                  <th className="px-4 py-2 text-left text-sm font-medium">Transaction Id</th>
                  <th className="px-4 py-2 text-left text-sm font-medium">Receiver AccountId</th>
                  <th className="px-4 py-2 text-left text-sm font-medium">Transaction Type</th>
                  <th className="px-4 py-2 text-left text-sm font-medium">Amount</th>
                  <th className="px-4 py-2 text-left text-sm font-medium">Date</th>
                  <th className="px-4 py-2 text-left text-sm font-medium">Time</th>
                  <th className="px-4 py-2 text-left text-sm font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {currentTransactions.map((transaction, index) => (
                  <tr key={index} className="border-b dark:border-gray-700">
                    <td className="px-4 py-2 text-sm">{index + 1}</td>
                    <td className="px-4 py-2 text-sm">{transaction.id}</td>
                    <td className="px-4 py-2 text-sm">{transaction.creditId}</td>
                    <td className="px-4 py-2 text-sm">{transaction.transactionType}</td>
                    <td className="px-4 py-2 text-sm">{transaction.amount}</td>
                    <td className="px-4 py-2 text-sm">{new Date(transaction.timestamp).toLocaleDateString()}</td>
                    <td className="px-4 py-2 text-sm">{new Date(transaction.timestamp).toLocaleTimeString()}</td>
                    <td className="px-4 py-2 text-sm">{transaction.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700 disabled:opacity-50"
              >
                Previous
              </button>
              <div>
                Page {currentPage} of {Math.ceil(filteredTransactions.length / transactionsPerPage)}
              </div>
              <button
                onClick={nextPage}
                disabled={indexOfLastTransaction >= filteredTransactions.length}
                className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700 disabled:opacity-50"
              >
                Next
              </button>
            </div>
            {transactions.length === 0 && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">No transactions found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
