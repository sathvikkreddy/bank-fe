import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState(null);
  const [balance, setBalance] = useState(0);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("authorization");
      const response = await axios.get(
        "https://techbuzzers.somee.com/GetUserDetails",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserDetails(response.data.userDetails);
      setBalance(response.data.accounts[0].balance);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userDetails) {
    return <div>Loading...</div>;
  }

  const handleCheckBalance = async () => {
    const { value: password } = await Swal.fire({
      title: "Enter Your Pin",
      input: "password",
      inputLabel: "Password",
      inputPlaceholder: "Enter your Pin",
      inputAttributes: {
        maxlength: "4",
        autocapitalize: "off",
        autocorrect: "off",
        pattern: "[0-9]*",
      },
    });
    if (password === userDetails.pin.toString()) {
      Swal.fire(`Available Balance : ${balance}`);
    }
  };


  const handleProfileUpdate = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Update Profile",
      html: `
        <input id="swal-input1" class="swal2-input" placeholder="FirstName" value="${userDetails.firstName}">
        <input id="swal-input01" class="swal2-input" placeholder="LastNmae" value="${userDetails.lastName}">
        <input id="swal-input2" class="swal2-input" placeholder="Email" value="${userDetails.email}">
        <input id="swal-input3" class="swal2-input" placeholder="Address" value="${userDetails.address}">
      `,
      focusConfirm: false,
      preConfirm: () => {
        return {
          firstname: document.getElementById("swal-input1").value,
          lastname:document.getElementById("swal-input01").value,
          email: document.getElementById("swal-input2").value,
          address: document.getElementById("swal-input3").value,
        };
      },
    });
  
    if (formValues) {
      try {
        const token = localStorage.getItem("authorization");
        const updatedUserDetails = {
          ...userDetails,
          firstName: formValues.firstname,
          lastname:formValues.lastname,
          email: formValues.email,
          address: formValues.address,
        };
        const response = await axios.put(
          "https://techbuzzers.somee.com/UpdateUser",
          updatedUserDetails,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        Swal.fire({
          title: "Profile Updated",
          text: "Your profile has been updated successfully!",
          icon: "success",
        });
        setUserDetails(updatedUserDetails);
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "Failed to update profile. Please try again later.",
          icon: "error",
        });
      }
    }
  };
  

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("authorization");
        navigate("/signin"); 
      }
    });
  };

  return (
    <>
      <button
        className="absolute top-0 right-0 py-3 px-5 border border-transparent rounded-md bg-blue-500 text-white cursor-pointer transition duration-300 hover:bg-blue-600 m-5"
        onClick={handleLogout}
      >
        Logout
      </button>

      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8  w-full max-w-2xl">
          <div className="profile-icon-container mb-6"></div>
          <div className="profile-details grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="info-box border p-4 rounded-lg">
              <h3 className="text-lg font-bold mb-2">Personal Information</h3>
              <p>
                <strong>Name:</strong> {userDetails.firstName}{" "}
                {userDetails.lastName}
              </p>
              <p>
                <strong>Email:</strong> {userDetails.email}
              </p>
              <p>
                <strong>Phone:</strong> {userDetails.phoneNumber}
              </p>
              <p>
                <strong>Address:</strong> {userDetails.address}
              </p>
            </div>
            <div className="info-box border p-4 rounded-lg">
              <h3 className="text-lg font-bold mb-2">Government IDs</h3>
              <p>
                <strong>Pan Card:</strong> {userDetails.panNumber}
              </p>
              <p>
                <strong>Aadhar Number:</strong> {userDetails.adhaarNumber}
              </p>
            </div>
          </div>
          <div className="mt-6">
         <center>
          
         <button
           class="profile-button py-2 px-5 border border-transparent rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition duration-300"
               onClick={handleProfileUpdate}
            >
              Update Profile
            </button>
          </center>  
       
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
