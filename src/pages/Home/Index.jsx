import React from "react";
import Card from "../../components/Card";
import PageTitle from "../../components/PageTitle";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const handleManageAccountClick = () => {
    // navigate("/profile");
    console.log("account managed");
  };
  const handleActionClick = (link) => {
    console.log(link);
  };
  const handleManageLoansClick = () => {
    console.log("loan managed");
  };
  const quickActions = [
    { name: "action1", link: "#" },
    { name: "action2", link: "#" },
    { name: "action3", link: "#" },
    { name: "action4", link: "#" },
    { name: "action5", link: "#" },
  ];
  const user = {
    userId: "USR59277434",
    userDetails: {
      firstName: "Madam",
      lastName: "Curie",
      phoneNumber: 8309032688,
      email: "mcurie@curified.com",
      fatherName: "Father Curie",
      adhaarNumber: 696969696969,
      panNumber: "6969696969",
      gender: "Female",
      dob: "2002-11-21T00:00:00",
      address: "48-477, ganesh nagar , chintal, quthubullapur , medchal.",
      pin: 0,
    },
    accounts: [
      {
        id: "ACN16988738",
        accountName: "DefaultAccount",
        userId: "USR59277434",
        balance: 5000,
        transactions: [],
        loans: [
          { id: "1", name: "Personal" },
          { id: "2", name: "Gold" },
        ],
      },
    ],
  };
  return (
    <div>
      <PageTitle title={"Home"} />
      <div className="font-light text-2xl p-2">
        Welcome, {user.userDetails.firstName + " " + user.userDetails.lastName}
      </div>
      <div className="flex gap-6 justify-around p-2">
        <div className="w-1/2 flex-1">
          <Card title={`Account: ${user.accounts[0].accountName}`}>
            <div className="flex flex-col justify-between h-full">
              <div className="flex flex-col gap-4">
                <div className="text-grey-500 text-xl font-light">
                  <span className="font-semibold">ID: </span>
                  {user.accounts[0].id}
                </div>
                <div className="text-grey-500 text-xl font-light">
                  <span className="font-semibold">Balance: </span>
                  {user.accounts[0].balance}
                </div>
                {user.accounts[0].loans.length !== 0 ? (
                  <div className="text-grey-500 flex gap-2 text-xl font-light">
                    <span className="font-semibold">Active Loans: </span>
                    {user.accounts[0].loans.map((loan) => {
                      return <div key={loan.id}>{loan.name + ","}</div>;
                    })}
                    {/* <Button title={"Manage"} onClick={handleManageLoansClick} /> */}
                  </div>
                ) : null}
              </div>
              <div>
                <Button
                  title={"Manage Account"}
                  onClick={handleManageAccountClick}
                />
              </div>
            </div>
          </Card>
        </div>
        <div className="w-1/2 flex-1">
          <Card title={"Quick Actions"}>
            <div className="grid grid-cols-12">
              <div className="col-span-10 gap-2 grid grid-cols-1">
                {quickActions.map((action) => {
                  return (
                    <div
                      key={action.name}
                      className="text-lg flex items-center"
                    >
                      {action.name}
                    </div>
                  );
                })}
              </div>
              <div className="col-span-2 gap-2 grid grid-cols-1">
                {quickActions.map((action) => {
                  return (
                    <div key={action.name} className="py-1">
                      <Button
                        title={"->"}
                        onClick={() => {
                          handleActionClick(action.link);
                        }}
                      ></Button>
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;

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
      <h3 className="text-base font-bold text-gray-800">Recent Transactions</h3>
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
</div>;
