import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function getDatesOfCurrentMonth() {
  // Get the current date
  const currentDate = new Date();

  // Get the current year and month
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  // Get the last day of the current month
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // Create an array with dates from 1 to the last day of the month
  const datesArray = Array.from({ length: lastDayOfMonth }, (_, i) => i + 1);

  return datesArray;
}

function getBalancesOfCurrentMonth(transactions, accountId) {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDate();

  const balances = new Array(currentDay).fill(null);

  // Filter transactions for the current month and for the specific account ID
  const currentMonthTransactions = transactions.filter((transaction) => {
    const transactionDate = new Date(transaction.timestamp);
    return (
      transactionDate.getFullYear() === currentYear &&
      transactionDate.getMonth() === currentMonth &&
      (transaction.debitId === accountId || transaction.creditId === accountId)
    );
  });

  const sortedCurrentMonthTransactions = currentMonthTransactions.sort(
    (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
  );

  let startingBalance = 0;

  if (sortedCurrentMonthTransactions.length > 0) {
    const firstTransaction = sortedCurrentMonthTransactions[0];
    startingBalance =
      firstTransaction.debitId === accountId
        ? firstTransaction.openingBalance
        : firstTransaction.receiverOpeningBalance;
  } else if (transactions.length > 0) {
    const latestTransaction = transactions.find(
      (transaction) =>
        transaction.debitId === accountId || transaction.creditId === accountId
    );
    if (latestTransaction) {
      startingBalance =
        latestTransaction.debitId === accountId
          ? latestTransaction.closingBalance
          : latestTransaction.receiverClosingBalance;
    }
  }
  const transactionsByDate = sortedCurrentMonthTransactions.reduce(
    (acc, transaction) => {
      const date = new Date(transaction.timestamp).getDate();
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(transaction);
      return acc;
    },
    {}
  );

  Object.keys(transactionsByDate).forEach((date) => {
    const dayTransactions = transactionsByDate[date];
    const lastTransaction = dayTransactions[dayTransactions.length - 1];
    balances[date - 1] =
      lastTransaction.debitId === accountId
        ? lastTransaction.closingBalance
        : lastTransaction.receiverClosingBalance;
  });

  for (let i = 0; i < balances.length; i++) {
    if (balances[i] === null) {
      balances[i] = i === 0 ? startingBalance : balances[i - 1];
    }
  }

  return balances;
}

export const options = {
  scales: {
    x: {
      grid: {
        display: true,
        color: "rgba(107, 114, 128, 0.1)",
      },
    },
    y: {
      grid: {
        display: true,
      },
    },
  },
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: "bottom",
    },
  },
};

export const BalancesChart = ({ transactions, selectedAccount }) => {
  const labels = getDatesOfCurrentMonth();
  const response = getBalancesOfCurrentMonth(transactions, selectedAccount.id);
  const data = {
    labels,
    datasets: [
      {
        label: "Balance",
        data: response,
        borderColor: "rgba(107, 114, 128, 1)",
        borderWidth: 1,
        pointRadius: 2,
      },
    ],
  };
  return (
    <div className="w-full h-full">
      <Line options={options} data={data} />
    </div>
  );
};
