import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

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

function getBalancesOfCurrentMonth(transactions) {
  // Get the current date, month, and year
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDate();

  // Initialize an array to store balances for each day of the current month up to today
  const balances = new Array(currentDay).fill(null);

  // Filter transactions for the current month
  const currentMonthTransactions = transactions.filter((transaction) => {
    const transactionDate = new Date(transaction.timestamp);
    return transactionDate.getFullYear() === currentYear && transactionDate.getMonth() === currentMonth;
  });

  let startingBalance = 0;

  if (currentMonthTransactions.length > 0) {
    // Start from the opening balance of the first transaction of the month
    startingBalance = currentMonthTransactions[0].openingBalance;
  } else if (transactions.length > 0) {
    // Start from the closing balance of the latest transaction if no transactions in the current month
    startingBalance = transactions[transactions.length - 1].closingBalance;
  }

  // Group transactions by their date
  const transactionsByDate = currentMonthTransactions.reduce((acc, transaction) => {
    const date = new Date(transaction.timestamp).getDate();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(transaction);
    return acc;
  }, {});

  // Get the closing balance of the last transaction for each day
  Object.keys(transactionsByDate).forEach((date) => {
    const dayTransactions = transactionsByDate[date];
    const lastTransaction = dayTransactions[dayTransactions.length - 1];
    balances[date - 1] = lastTransaction.closingBalance;
  });

  // Fill in the days with no transactions
  for (let i = 0; i < balances.length; i++) {
    if (balances[i] === null) {
      balances[i] = i === 0 ? startingBalance : balances[i - 1];
    }
  }

  return balances;
}

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: "bottom",
    },
  },
};

export const BalancesChart = ({ transactions }) => {
  const labels = getDatesOfCurrentMonth();
  const data = {
    labels,
    datasets: [
      {
        label: "Balance",
        data: getBalancesOfCurrentMonth(transactions),
        borderColor: "black",
        borderWidth: 1,
        pointRadius: 2,
      },
    ],
  };
  return (
    <div className="pb-4">
      <Line options={options} data={data} />
    </div>
  );
};
