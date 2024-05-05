import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  validatePIN,
  validatePhoneNumber,
  validateSigninForm,
} from "../inputValidators";

export default function Signin() {
  const navigate = useNavigate();
  const [fields, setFields] = useState({ phoneNumber: "", pin: "" });
  const [warnings, setWarnings] = useState({ phoneNumber: " ", pin: " " });
  const [errorMessage, setErrorMessage] = useState("");
  let isValidForm = validateSigninForm(warnings);
  useEffect(() => {
    const signedIn = false;
    if (signedIn) navigate("/");
  }, []);
  const onSignin = async (e, fields) => {
    e.preventDefault();
    // navigate("/");
    const reqBody = {
      phoneNumber: Number(fields.phoneNumber),
      pin: Number(fields.pin),
    };
    try {
      const res = await axios.post(
        "https://techbuzzers.somee.com/signin",
        reqBody,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const token = res.data.token;
      console.log(token);
      localStorage.setItem("authorization", token);
      navigate("/");
    } catch (error) {
      console.log(error);
      setErrorMessage(JSON.stringify(error.response.data));
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2">
        <div className="flex-1 space-y-8 bg-white p-10">
          <div>
            <h2 className="text-2xl font-extrabold text-gray-900">
              Sign in into your account
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Don't have an account?
              <Link className="font-medium underline px-2" to="/signup">
                Signup
              </Link>
            </p>
          </div>
          <div className="space-y-3">
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
                  placeholder="9786452506"
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
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
            <div>
              <button
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md bg-black shadow-sm text-sm font-medium text-white ${
                  isValidForm ? "cursor-pointer" : "cursor-not-allowed"
                } hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black`}
                type="submit"
                onClick={(e) => onSignin(e, fields)}
                disabled={!isValidForm}
              >
                Sign In
              </button>
            </div>
            <div className="font-thin text-red-500 text-sm pt-4">
              {errorMessage}
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
                Sign in to experience all the features and get benifits.
              </p>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}
