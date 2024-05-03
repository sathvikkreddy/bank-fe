import React from "react";

const Home = () => {
  return (
    <div className="h-screen w-full flex flex-col bg-gray-100">
      <header className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
        <h1 className="text-xl font-bold text-gray-800">HOME</h1>
        <div className="flex items-center space-x-4">
          <p className="text-gray-600">Welcome, FirstName</p>
          <input
            type="text"
            className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Search"
          />
        </div>
      </header>
      <main className="flex-grow px-6 py-8">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-md shadow-md p-6">
            <h3 className="text-base font-bold text-gray-800">Account</h3>
            <p className="text-gray-600">Default Account</p>
            <p className="text-gray-600">Account ID: ACN77863</p>
            <p className="text-xl font-semibold text-gray-800">Balance: 6876</p>
          </div>
          <div className="bg-white rounded-md shadow-md p-6">
            <h3 className="text-base font-bold text-gray-800">Quick Actions</h3>
            <button className="px-3 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-700">
              Transfer
            </button>
            <button className="px-3 py-2 rounded-md bg-green-500 text-white hover:bg-green-700 mt-2">
              Apply Loan
            </button>
          </div>
        </section>
        <section className="mt-6">
          <h3 className="text-base font-bold text-gray-800">
            Recent Transactions
          </h3>
          <table className="w-full rounded-md shadow-md mt-4">
            <thead>
              <tr className="bg-gray-100 text-left text-gray-600 font-medium">
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Account</th>
                <th className="px-4 py-2">Time</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-gray-200">
                <td className="px-4 py-2">sjet76g</td>
                <td className="px-4 py-2">--</td>
                <td className="px-4 py-2">23:23, 21-12-2024</td>
                <td className="px-4 py-2">200.25</td>
                <td className="px-4 py-2">Received</td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
      <footer className="mt-auto px-6 py-4 bg-white shadow-md flex justify-between items-center">
        <p className="text-gray-600">Manage Account</p>
        <button className="px-3 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-700">
          Pay Bills
        </button>
      </footer>
    </div>
  );
};

export default Home;
