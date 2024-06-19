import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  validatePIN,
  validatePhoneNumber,
  validateSigninForm,
} from "../../inputValidators";
import ModeToggle from "../../components/ModeToggle";

export default function Signin() {
  const navigate = useNavigate();
  const [fields, setFields] = useState({ phoneNumber: "", pin: "" });
  const [warnings, setWarnings] = useState({ phoneNumber: " ", pin: " " });
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  let isValidForm = validateSigninForm(warnings);
  useEffect(() => {
    const token = localStorage.getItem("authorization");
    if (token) navigate("/");
  }, []);
  const onSignin = async (e, fields) => {
    e.preventDefault();
    const reqBody = {
      phoneNumber: Number(fields.phoneNumber),
      pin: Number(fields.pin),
    };
    try {
      setIsLoading(true);
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
      const localStorageToken = localStorage.getItem("authorization");
      console.log("local storage token = ", localStorageToken);
      setIsLoading(false);
      navigate("/");
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      setErrorMessage(JSON.stringify(error.response.data));
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-700 dark:text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2">
        <div className="flex-1 space-y-8 bg-white dark:bg-gray-800 p-10">
          <div>
            <h2 className="text-2xl font-extrabold">
              Sign in into your account
            </h2>
            <div className="flex">
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                Don't have an account?
                <Link className="font-medium underline px-2" to="/signup">
                  Signup
                </Link>
              </p>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <label
                className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                htmlFor="phoneNumber"
              >
                Phone Number{" "}
                <span className="text-red-500 text-xs font-light">
                  {warnings.phoneNumber}
                </span>
              </label>
              <div className="mt-1">
                <input
                  autoComplete="phoneNumber"
                  className="dark:bg-gray-800 appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm dark:shadow-slate-600 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                htmlFor="pin"
              >
                Pin{" "}
                <span className="text-red-500 text-xs font-light">
                  {warnings.pin}
                </span>
              </label>
              <div className="mt-1">
                <input
                  autoComplete="pin"
                  className="dark:bg-gray-800 appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm dark:shadow-slate-600 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                  isValidForm && !isLoading
                    ? "cursor-pointer"
                    : "cursor-not-allowed"
                } hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black`}
                type="submit"
                onClick={(e) => onSignin(e, fields)}
                disabled={!isValidForm}
              >
                {`${isLoading ? "Signing In" : "Sign In"}`}
              </button>
            </div>
            <div className="font-light text-red-500 text-sm pt-4">
              {errorMessage}
            </div>
            <div className="flex max-h-10 gap-4">
              <div className="flex flex-col justify-center">Mode:</div>
              <div className="flex flex-col justify-center">
                <ModeToggle />
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center invisible sm:visible m-4">
          <div className="relative bg-gray-200 dark:bg-gray-600 rounded-lg p-8 text-gray-600">
            <svg
              aria-hidden="true"
              className="absolute top-0 right-0 h-8 w-8 text-gray-300 transform translate-x-1/2 -translate-y-1/2"
              fill="currentColor"
              viewBox="0 0 32 32"
            >
              <path d="M9.333 7h13.334C24.403 7 26 8.597 26 10.667v10.666C26 23.403 24.403 25 22.667 25H9.333C7.597 25 6 23.403 6 21.333V10.667C6 8.597 7.597 7 9.333 7z" />
            </svg>
            <p className="text-2xl font-extrabold dark:text-gray-300">
              Team Tech Buzzers
            </p>
            <footer className="mt-4">
              <p className="text-4xl font-thin dark:text-gray-300">
                The Bank App
              </p>
              <p className="text-base font-light text-gray-500 dark:text-gray-300 py-5">
                Sign in to experience all the features and get benifits.
              </p>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}
