import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  validateAadhar,
  validateAddress,
  validateDOB,
  validateEmail,
  validateFatherName,
  validateFirstName,
  validateGender,
  validateLastName,
  validatePIN,
  validatePan,
  validatePhoneNumber,
  validateSignupForm,
} from "../../inputValidators";

export default function Signup() {
  const navigate = useNavigate();

  useEffect(() => {
    const signedIn = false;
    if (signedIn) navigate("/");
  }, []);
  const [page, setPage] = useState(1);
  const [fields, setFields] = useState({
    firstName: "",
    lastName: "",
    fatherName: "",
    phoneNumber: "",
    pin: "",
    pan: "",
    aadhar: "",
    email: "",
    address: "",
    dob: "",
    gender: "",
  });
  const [warnings, setWarnings] = useState({
    firstName: " ",
    lastName: " ",
    fatherName: " ",
    phoneNumber: " ",
    pin: " ",
    pan: " ",
    aadhar: " ",
    email: " ",
    address: " ",
    dob: " ",
    gender: " ",
  });
  const [errorMessage, setErrorMessage] = useState("");
  let isValidForm = validateSignupForm(warnings);
  const onSignup = async (e) => {
    e.preventDefault();
    const reqBody = {
      firstName: fields.firstName,
      lastName: fields.lastName,
      phoneNumber: Number(fields.phoneNumber),
      email: fields.email,
      fatherName: fields.fatherName,
      adhaarNumber: Number(fields.aadhar),
      panNumber: fields.pan,
      gender: fields.gender,
      dob: fields.dob,
      address: fields.address,
      pin: Number(fields.pin),
    };
    try {
      const res = await axios.post(
        "https://techbuzzers.somee.com/signup",
        reqBody,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // const token = res.data.token;
      // console.log("token:", token);
      // localStorage.setItem("authorization", token);
      console.log("signup success");
      navigate("/signin");
    } catch (error) {
      setErrorMessage(JSON.stringify(error.response.data));
      console.log(error);
    }
  };
  const page1 = () => {
    return (
      <>
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
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              id="firstName"
              name="firstName"
              placeholder="john"
              required
              value={fields.firstName}
              type="text"
              onChange={(e) => {
                setFields((c) => ({ ...c, firstName: e.target.value }));
                if (!validateFirstName(e.target.value)) {
                  setWarnings((c) => ({
                    ...c,
                    firstName: "* must be 3-15 letters",
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
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              id="lastName"
              name="lastName"
              placeholder="doe"
              required
              value={fields.lastName}
              type="text"
              onChange={(e) => {
                setFields((c) => ({ ...c, lastName: e.target.value }));
                if (!validateLastName(e.target.value)) {
                  setWarnings((c) => ({
                    ...c,
                    lastName: "* must be 3-15 letters",
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
            htmlFor="fatherName"
          >
            Father Name{" "}
            <span className="text-red-500 text-xs font-thin">
              {warnings.fatherName}
            </span>
          </label>
          <div className="mt-1">
            <input
              autoComplete="fatherName"
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              id="fatherName"
              name="fatherName"
              placeholder="jack doe"
              required
              value={fields.fatherName}
              type="text"
              onChange={(e) => {
                setFields((c) => ({ ...c, fatherName: e.target.value }));
                if (!validateFatherName(e.target.value)) {
                  setWarnings((c) => ({
                    ...c,
                    fatherName: "* must be 3-30 letters",
                  }));
                } else {
                  setWarnings((c) => ({
                    ...c,
                    fatherName: "",
                  }));
                }
              }}
            />
          </div>
          <div className="pt-2">
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
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                id="address"
                name="address"
                placeholder="Enter your address"
                required
                value={fields.address}
                type="text"
                onChange={(e) => {
                  setFields((c) => ({ ...c, address: e.target.value }));
                  if (!validateAddress(e.target.value)) {
                    setWarnings((c) => ({
                      ...c,
                      address: "* must be less than 100 characters",
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
          <div className="pt-2">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="dob"
            >
              DOB{" "}
              <span className="text-red-500 text-xs font-thin">
                {warnings.dob}
              </span>
            </label>
            <div className="mt-1">
              <input
                autoComplete="dob"
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                id="dob"
                name="dob"
                placeholder="2001-05-21"
                required
                value={fields.dob}
                type="text"
                onChange={(e) => {
                  setFields((c) => ({ ...c, dob: e.target.value }));
                  if (!validateDOB(e.target.value)) {
                    setWarnings((c) => ({
                      ...c,
                      dob: "* must be in YYYY-MM-DD format",
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
          <div className="pt-2">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="dob"
            >
              Gender{" "}
              <span className="text-red-500 text-xs font-thin">
                {warnings.gender}
              </span>
            </label>
            <div className="mt-1">
              <input
                autoComplete="gender"
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                id="gender"
                name="gender"
                placeholder="Male, Female, Others"
                required
                value={fields.gender}
                type="text"
                onChange={(e) => {
                  setFields((c) => ({ ...c, gender: e.target.value }));
                  if (!validateGender(e.target.value)) {
                    setWarnings((c) => ({
                      ...c,
                      gender: "* must be Male, Female or Others",
                    }));
                  } else {
                    setWarnings((c) => ({
                      ...c,
                      gender: "",
                    }));
                  }
                }}
              />
            </div>
          </div>
        </div>
      </>
    );
  };
  const page2 = () => {
    return (
      <>
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
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="9000340004"
              required
              value={fields.phoneNumber}
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
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              id="email"
              name="email"
              placeholder="johndoe@gmail.com"
              required
              value={fields.email}
              type="text"
              onChange={(e) => {
                setFields((c) => ({ ...c, email: e.target.value }));
                if (!validateEmail(e.target.value)) {
                  setWarnings((c) => ({
                    ...c,
                    email: "* must be valid email",
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
            htmlFor="aadhar"
          >
            Aadhar{" "}
            <span className="text-red-500 text-xs font-thin">
              {warnings.aadhar}
            </span>
          </label>
          <div className="mt-1">
            <input
              autoComplete="aadhar"
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              id="aadhar"
              name="aadhar"
              placeholder="678956731235"
              required
              value={fields.aadhar}
              type="text"
              onChange={(e) => {
                setFields((c) => ({ ...c, aadhar: e.target.value }));
                if (!validateAadhar(e.target.value)) {
                  setWarnings((c) => ({
                    ...c,
                    aadhar: "* must be 12 digits",
                  }));
                } else {
                  setWarnings((c) => ({
                    ...c,
                    aadhar: "",
                  }));
                }
              }}
            />
          </div>
        </div>
        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="pan"
          >
            Pan{" "}
            <span className="text-red-500 text-xs font-thin">
              {warnings.pan}
            </span>
          </label>
          <div className="mt-1">
            <input
              autoComplete="pan"
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              id="pan"
              name="pan"
              placeholder="FBIRE2138A"
              required
              value={fields.pan}
              type="text"
              onChange={(e) => {
                setFields((c) => ({ ...c, pan: e.target.value }));
                if (!validatePan(e.target.value)) {
                  setWarnings((c) => ({
                    ...c,
                    pan: "* must be 10 characters",
                  }));
                } else {
                  setWarnings((c) => ({
                    ...c,
                    pan: "",
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
            Set your pin{" "}
            <span className="text-red-500 text-xs font-thin">
              {warnings.pin}
            </span>
          </label>
          <div className="mt-1">
            <input
              autoComplete="pin"
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              id="pin"
              name="pin"
              placeholder="1234"
              required
              value={fields.pin}
              type="password"
              onChange={(e) => {
                setFields((c) => ({ ...c, pin: e.target.value }));
                if (!validatePIN(e.target.value)) {
                  setWarnings((c) => ({
                    ...c,
                    pin: "* must be 4 digits",
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
      </>
    );
  };
  const page3 = () => {
    function shortenString(str) {
      if (str.length > 30) {
        return str.substring(0, 30) + "...";
      } else {
        return str;
      }
    }
    return (
      <div>
        <div className="flex">
          <div className="grid grid-cols-1 w-1/3 gap-2">
            <div>First Name:</div>
            <div>Last Name:</div>
            <div>Father Name: </div>
            <div>DOB: </div>
            <div>Gender: </div>
            <div>Phone Number: </div>
            <div>Email: </div>
            <div>Aadhar: </div>
            <div>Pan: </div>
            <div>Address: </div>
          </div>
          <div className="grid grid-cols-1 w-2/3 gap-2">
            <div>{shortenString(fields.firstName)}</div>
            <div>{shortenString(fields.lastName)}</div>
            <div>{shortenString(fields.fatherName)}</div>
            <div>{shortenString(fields.dob)}</div>
            <div>{shortenString(fields.gender)}</div>
            <div>{shortenString(fields.phoneNumber)}</div>
            <div>{shortenString(fields.email)}</div>
            <div>{shortenString(fields.aadhar)}</div>
            <div>{shortenString(fields.pan)}</div>
            <div>{shortenString(fields.address)}</div>
          </div>
        </div>
        {isValidForm ? null : (
          <div className="font-thin text-red-500 text-sm pt-4">
            All fields must be valid to signup
          </div>
        )}
        {
          <div className="font-thin text-red-500 text-sm pt-4">
            {errorMessage}
          </div>
        }
      </div>
    );
  };
  const SignupButton = () => {
    return (
      <button
        className={`w-3/5 flex justify-center py-2 px-4 border border-transparent rounded-md bg-black shadow-sm text-sm font-medium text-white ${
          isValidForm ? "cursor-pointer" : "cursor-not-allowed"
        } hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black`}
        type="submit"
        onClick={(e) => onSignup(e, fields)}
        disabled={!isValidForm}
      >
        Confirm & Sign Up
      </button>
    );
  };
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2">
        <div className="flex-1 space-y-8 bg-white p-10">
          <div>
            <h2 className="text-2xl font-extrabold text-gray-900">
              Create Your Account
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Already have an account?
              <Link className="font-medium underline px-2" to="/signin">
                Signin
              </Link>
            </p>
          </div>
          <div className="space-y-3">
            {page === 1 ? page1() : page === 2 ? page2() : page3()}
          </div>
          <div className="flex justify-between gap-2">
            <button
              className={`w-1/5 flex justify-center py-2 px-4 border border-transparent rounded-md bg-black shadow-sm text-sm font-medium text-white ${
                page !== 1 ? "cursor-pointer" : "cursor-not-allowed"
              } hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black`}
              disabled={page === 1 ? true : false}
              onClick={() => {
                setPage(page - 1);
              }}
            >
              Back
            </button>
            {page !== 3 ? (
              <button
                className={`w-3/5 flex justify-center py-2 px-4 border border-transparent rounded-md bg-black shadow-sm text-sm font-medium text-white ${
                  page !== 3 ? "cursor-pointer" : "cursor-not-allowed"
                } hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black`}
                onClick={() => {
                  setPage(page + 1);
                }}
              >
                Next
              </button>
            ) : (
              SignupButton()
            )}
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
