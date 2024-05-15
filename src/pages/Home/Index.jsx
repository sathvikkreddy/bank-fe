import React from "react";
import Card from "../../components/Card";
import PageTitle from "../../components/PageTitle";
import Button from "../../components/Button";
import { json, useNavigate } from "react-router-dom";
import useGetUser from "../../hooks/useGetUser";
import { capitalize } from "../../utils/stringUtils";
const Home = () => {
  const { profile, error, isLoading } = useGetUser();
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
    { name: "action4", link: "#" },
    { name: "action5", link: "#" },
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
        <div className="w-1/2 flex-1">
          <Card title={`Account: ${profile.accounts[0].accountName}`}>
            <div className="flex flex-col justify-between h-full">
              <div className="flex flex-col gap-4">
                <div className="text-grey-500 text-xl font-light">
                  <span className="font-semibold">ID: </span>
                  {profile.accounts[0].id}
                </div>
                <div className="text-grey-500 text-xl font-light">
                  <span className="font-semibold">Balance: </span>
                  {profile.accounts[0].balance}
                </div>
                {profile.accounts[0].loans.length !== 0 ? (
                  <div className="text-grey-500 flex gap-2 text-xl font-light">
                    <span className="font-semibold">Active Loans: </span>
                    {profile.accounts[0].loans.map((loan) => {
                      return <div key={loan.id}>{loan.name + ","}</div>;
                    })}
                  </div>
                ) : null}
              </div>
              <div>
                <Button onClick={handleManageAccountClick} title={"Manage Account"} />
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
  );
};

export default Home;
