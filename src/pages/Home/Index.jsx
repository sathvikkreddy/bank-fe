import React, { useEffect, useState } from "react";
import Card from "../../components/Card";
import PageTitle from "../../components/PageTitle";
import Button from "../../components/Button";
import Dropdown from "../../components/Dropdown";
import { useNavigate, useOutletContext } from "react-router-dom";
import { capitalize } from "../../utils/stringUtils";
import { BalancesChart } from "../../components/BalancesChart";
const Home = () => {
  const [profile, isLoading, transactions] = useOutletContext();
  const [selectedAccount, setSelectedAccount] = useState(profile.accounts[0]);
  const fakeId = selectedAccount.id;
  const fakeTransactions = [
    {
      id: "TRN23698460",
      timestamp: "2024-05-13T21:37:37.8320749",
      amount: 10,
      debitId: fakeId,
      creditId: "ACN38803722",
      debitUserId: "USR92596727",
      creditUserId: "USR87104898",
      debitUserName: "",
      creditUserName: "",
      creditOpeningBalance: 0,
      creditClosingBalance: 10,
      debitOpeningBalance: 5000,
      debitClosingBalance: 4990,
      transactionType: "",
      status: "completed",
    },
    {
      id: "TRN28874454",
      timestamp: "2024-05-14T05:58:49.7297965",
      amount: 10,
      debitId: fakeId,
      creditId: "ACN38803722",
      debitUserId: "USR68600851",
      creditUserId: "USR87104898",
      debitUserName: "string string",
      creditUserName: "string string",
      creditOpeningBalance: 10,
      creditClosingBalance: 20,
      debitOpeningBalance: 4990,
      debitClosingBalance: 4980,
      transactionType: "UserToUser Transfer",
      status: "completed",
    },
    {
      id: "TRN33759272",
      timestamp: "2024-05-15T05:59:29.8009416",
      amount: 2000,
      debitId: "ACN98619068",
      creditId: fakeId,
      debitUserId: "USR68600851",
      creditUserId: "USR87104898",
      debitUserName: "string string",
      creditUserName: "string string",
      creditOpeningBalance: 20,
      creditClosingBalance: 2020,
      debitOpeningBalance: 4980,
      debitClosingBalance: 2980,
      transactionType: "UserToUser Transfer",
      status: "completed",
    },
    {
      id: "TRN45101796",
      timestamp: "2024-05-16T05:59:47.5089639",
      amount: 20,
      debitId: fakeId,
      creditId: "ACN98619068",
      debitUserId: "USR68600851",
      creditUserId: "USR87104898",
      debitUserName: "string string",
      creditUserName: "string string",
      creditOpeningBalance: 2980,
      creditClosingBalance: 3000,
      debitOpeningBalance: 2020,
      debitClosingBalance: 2000,
      transactionType: "UserToUser Transfer",
      status: "completed",
    },
    {
      id: "TRN46080593",
      timestamp: "2024-05-17T22:05:10.6263439",
      amount: 500,
      debitId: "ACN98619068",
      creditId: fakeId,
      debitUserId: "USR92596727",
      creditUserId: "USR87104898",
      debitUserName: "",
      creditUserName: "",
      creditOpeningBalance: 3000,
      creditClosingBalance: 2500,
      debitOpeningBalance: 2000,
      debitClosingBalance: 2500,
      transactionType: "",
      status: "completed",
    },
  ];
  const navigate = useNavigate();
  const handleManageAccountClick = () => {
    navigate("/account");
    // console.log("account managed");
  };
  const handleActionClick = (link) => {
    console.log(link);
  };
  const quickActions = [
    { name: "action1", link: "#" },
    { name: "action2", link: "#" },
    { name: "action3", link: "#" },
  ];
  // const isLoading = false;
  // const profile = {
  //   userId: "USR59277434",
  //   userDetails: {
  //     firstName: "yudd",
  //     lastName: "Curie",
  //     phoneNumber: 8309032688,
  //     email: "mcurie@curified.com",
  //     fatherName: "Father Curie",
  //     adhaarNumber: 696969696969,
  //     panNumber: "6969696969",
  //     gender: "Female",
  //     dob: "2002-11-21T00:00:00",
  //     address: "48-477, ganesh nagar , chintal, quthubullapur , medchal.",
  //     pin: 0,
  //   },
  //   accounts: [
  //     {
  //       id: "ACN16988738",
  //       accountName: "DefaultAccount",
  //       userId: "USR59277434",
  //       balance: 5000,
  //       transactions: [],
  //       loans: [
  //         { id: "ACN98619068", name: "Personal" },
  //         { id: "ACN38803722", name: "Gold" },
  //       ],
  //     },
  //   ],
  // };
  return (
    <div>
      <PageTitle title={"Home"} />
      <div className="font-light text-2xl p-2">
        Welcome, <span className="font-semibold">{capitalize(profile.userDetails.firstName) + " " + capitalize(profile.userDetails.lastName)}</span>
      </div>
      <div className="flex gap-4 justify-around p-2">
        <div className="w-2/3" name="chart">
          <Card title={"Your money this month"}>
            <BalancesChart transactions={fakeTransactions} selectedAccount={selectedAccount} />
          </Card>
        </div>
        <div className="w-1/3">
          <div className="h-1/2 pb-2">
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
                <div>
                  <Button onClick={handleManageAccountClick} title={"Manage Account"} />
                </div>
              </div>
            </Card>
          </div>
          <div className="h-1/2">
            <Card title={"Quick Actions"}>
              <div className="grid grid-cols-12">
                <div className="col-span-10 gap-2 grid grid-cols-1">
                  {quickActions.map((action) => {
                    return (
                      <div key={action.name} className="text-lg flex items-center">
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
    </div>
  );
};

export default Home;

// <div className="w-1/2 flex-1">
//   <Card title={"Quick Actions"}>
//     <div className="grid grid-cols-12">
//       <div className="col-span-10 gap-2 grid grid-cols-1">
//         {quickActions.map((action) => {
//           return (
//             <div key={action.name} className="text-lg flex items-center">
//               {action.name}
//             </div>
//           );
//         })}
//       </div>
//       <div className="col-span-2 gap-2 grid grid-cols-1">
//         {quickActions.map((action) => {
//           return (
//             <div key={action.name} className="py-1">
//               <Button
//                 title={"->"}
//                 onClick={() => {
//                   handleActionClick(action.link);
//                 }}
//               ></Button>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   </Card>
// </div>;
