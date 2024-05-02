import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  validateAddress,
  validateDOB,
  validateEmail,
  validateFirstName,
  validateLastName,
  validatePIN,
  validatePhoneNumber,
  validateSignupForm,
} from "../inputValidators";

export default function Signup() {
  const navigate = useNavigate();

  useEffect(() => {
    const signedIn = false;
    if (signedIn) navigate("/");
  }, []);
  const [fields, setFields] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    pin: "",
    email: "",
    address: "",
    dob: "",
  });
  const [warnings, setWarnings] = useState({
    firstName: " ",
    lastName: " ",
    phoneNumber: " ",
    pin: " ",
    email: " ",
    address: " ",
    dob: " ",
  });
  let isValidForm = validateSignupForm(warnings);
  const onSignup = async (e, fields) => {
    e.preventDefault();
    navigate("/");
    // const res = await axios.post(
    //   "http://127.0.0.1:8787/api/v1/user/signin",
    //   fields,
    //   {
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   }
    // );
    // const token = res.data.token;
    // localStorage.setItem("authorization", `Bearer ${token}`);
    // navigate("/blogs");
  };
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2">
        <div className="flex-1 space-y-5 bg-white py-4 px-10">
          <div>
            <h2 className="text-2xl font-extrabold text-gray-900">
              Create an account
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              Already have an account?
              <Link className="font-medium px-2 underline" to="/signin">
                Signin
              </Link>
            </p>
          </div>
          <div className="space-y-2">
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="firstName"
              >
                First Name{" "}
                <span className="text-red-500 text-xs font-thin">
                  {warnings.firstName}
                </span>
              </label>
              <div className="mt-1">
                <input
                  autoComplete="firstName"
                  className="appearance-none block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  id="firstName"
                  name="firstName"
                  placeholder="Enter your first name"
                  required
                  type="text"
                  onChange={(e) => {
                    setFields((c) => ({ ...c, firstName: e.target.value }));
                    if (!validateFirstName(e.target.value)) {
                      setWarnings((c) => ({
                        ...c,
                        firstName: "* must be 3-15 alphabets",
                      }));
                    } else {
                      setWarnings((c) => ({
                        ...c,
                        firstName: "",
                      }));
                    }
                  }}
                />
              </div>
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="lastName"
              >
                Last Name{" "}
                <span className="text-red-500 text-xs font-thin">
                  {warnings.lastName}
                </span>
              </label>
              <div className="mt-1">
                <input
                  autoComplete="lastName"
                  className="appearance-none block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  id="lastName"
                  name="name"
                  placeholder="Enter your last name"
                  required
                  type="text"
                  onChange={(e) => {
                    setFields((c) => ({ ...c, lastName: e.target.value }));
                    if (!validateLastName(e.target.value)) {
                      setWarnings((c) => ({
                        ...c,
                        lastName: "* must be 3-15 alphabets",
                      }));
                    } else {
                      setWarnings((c) => ({
                        ...c,
                        lastName: "",
                      }));
                    }
                  }}
                />
              </div>
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="phoneNumber"
              >
                Phone Number{" "}
                <span className="text-red-500 text-xs font-thin">
                  {warnings.phoneNumber}
                </span>
              </label>
              <div className="mt-1">
                <input
                  autoComplete="phoneNumber"
                  className="appearance-none block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="9846763253"
                  required
                  type="text"
                  onChange={(e) => {
                    setFields((c) => ({ ...c, phoneNumber: e.target.value }));
                    if (!validatePhoneNumber(e.target.value)) {
                      setWarnings((c) => ({
                        ...c,
                        phoneNumber: "* must be 10 digits",
                      }));
                    } else {
                      setWarnings((c) => ({
                        ...c,
                        phoneNumber: "",
                      }));
                    }
                  }}
                />
              </div>
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="email"
              >
                Email{" "}
                <span className="text-red-500 text-xs font-thin">
                  {warnings.email}
                </span>
              </label>
              <div className="mt-1">
                <input
                  autoComplete="email"
                  className="appearance-none block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  id="email"
                  name="email"
                  placeholder="johndoe@gmail.com"
                  required
                  type="text"
                  onChange={(e) => {
                    setFields((c) => ({ ...c, email: e.target.value }));
                    if (!validateEmail(e.target.value)) {
                      setWarnings((c) => ({
                        ...c,
                        email: "* must be a valid email",
                      }));
                    } else {
                      setWarnings((c) => ({
                        ...c,
                        email: "",
                      }));
                    }
                  }}
                />
              </div>
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="dob"
              >
                Date Of Birth{" "}
                <span className="text-red-500 text-xs font-thin">
                  {warnings.dob}
                </span>
              </label>
              <div className="mt-1">
                <input
                  autoComplete="dob"
                  className="appearance-none block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  id="dob"
                  name="dob"
                  placeholder="31-01-2001"
                  required
                  type="text"
                  onChange={(e) => {
                    setFields((c) => ({ ...c, dob: e.target.value }));
                    if (!validateDOB(e.target.value)) {
                      setWarnings((c) => ({
                        ...c,
                        dob: "* must be in DD-MM-YYYY format",
                      }));
                    } else {
                      setWarnings((c) => ({
                        ...c,
                        dob: "",
                      }));
                    }
                  }}
                />
              </div>
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="address"
              >
                Address{" "}
                <span className="text-red-500 text-xs font-thin">
                  {warnings.address}
                </span>
              </label>
              <div className="mt-1">
                <input
                  autoComplete="address"
                  className="appearance-none block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  id="address"
                  name="address"
                  placeholder="Enter address"
                  required
                  type="text"
                  onChange={(e) => {
                    setFields((c) => ({ ...c, pin: e.target.value }));
                    if (!validateAddress(e.target.value)) {
                      setWarnings((c) => ({
                        ...c,
                        address: "* must be less than 40 characters",
                      }));
                    } else {
                      setWarnings((c) => ({
                        ...c,
                        address: "",
                      }));
                    }
                  }}
                />
              </div>
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="pin"
              >
                Pin{" "}
                <span className="text-red-500 text-xs font-thin">
                  {warnings.pin}
                </span>
              </label>
              <div className="mt-1">
                <input
                  autoComplete="pin"
                  className="appearance-none block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  id="pin"
                  name="pin"
                  placeholder="1234"
                  required
                  type="password"
                  onChange={(e) => {
                    setFields((c) => ({ ...c, pin: e.target.value }));
                    if (!validatePIN(e.target.value)) {
                      setWarnings((c) => ({
                        ...c,
                        pin: "* must be 4 numerics",
                      }));
                    } else {
                      setWarnings((c) => ({
                        ...c,
                        pin: "",
                      }));
                    }
                  }}
                />
              </div>
            </div>
            <div className="">
              <button
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md bg-black shadow-sm text-sm font-medium text-white ${
                  isValidForm ? "cursor-pointer" : "cursor-not-allowed"
                } hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black`}
                type="submit"
                onClick={(e) => onSignup(e, fields)}
                disabled={!isValidForm}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center invisible sm:visible ">
          <div className="relative bg-gray-100 rounded-lg p-8 text-gray-600">
            <svg
              aria-hidden="true"
              className="absolute top-0 right-0 h-8 w-8 text-gray-200 transform translate-x-1/2 -translate-y-1/2"
              fill="currentColor"
              viewBox="0 0 32 32"
            >
              <path d="M9.333 7h13.334C24.403 7 26 8.597 26 10.667v10.666C26 23.403 24.403 25 22.667 25H9.333C7.597 25 6 23.403 6 21.333V10.667C6 8.597 7.597 7 9.333 7z" />
            </svg>
            <p className="text-2xl font-extrabold">Team Tech Buzzers</p>
            <footer className="mt-4">
              <p className="text-4xl font-thin">The Bank App</p>
              <p className="text-base font-thin text-gray-500 py-5">
                Sign up to experience all the features and get benifits.
              </p>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}
