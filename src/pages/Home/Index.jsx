import React, { useEffect, useState } from "react";
import Card from "../../components/Card";
import PageTitle from "../../components/PageTitle";
import Button from "../../components/Button";
import Dropdown from "../../components/Dropdown";
import { useNavigate } from "react-router-dom";
import { fetchUserDetails } from "../../utils/fetchUserDetails";
import { fetchUserTransactions } from "../../utils/fetchUserTransactions";
import { capitalize } from "../../utils/stringUtils";
import { BalancesChart } from "../../components/BalancesChart";
const Home = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState(null);
  const [selectedAccount, setSelectedAccount] = useState(null);
  useEffect(() => {
    fetchUserDetails().then((profile) => {
      setProfile(profile);
      setSelectedAccount(profile.accounts[0]);
      fetchUserTransactions().then((transactions) => {
        setTransactions(transactions);
        setIsLoading(false);
      });
    });
  }, []);
  const navigate = useNavigate();
  const handleManageAccountClick = () => {
    // navigate("/profile");
    console.log("account managed");
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
  //         { id: "1", name: "Personal" },
  //         { id: "2", name: "Gold" },
  //       ],
  //     },
  //   ],
  // };
  return isLoading ? (
    <div>loading</div>
  ) : (
    <div>
      <PageTitle title={"Home"} />
      <div className="font-light text-2xl p-2">
        Welcome, <span className="font-semibold">{capitalize(profile.userDetails.firstName) + " " + capitalize(profile.userDetails.lastName)}</span>
      </div>
      <div className="flex gap-4 justify-around p-2">
        <div className="w-2/3" name="chart">
          <Card title={"Your money this month"}>
            <BalancesChart transactions={transactions.filter((txn) => txn.debitId === selectedAccount.id || txn.creditId === selectedAccount.id)} />
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
