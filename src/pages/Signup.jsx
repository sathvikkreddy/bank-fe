import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
                First Name
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
                  onChange={(e) =>
                    setFields((c) => ({ ...c, firstName: e.target.value }))
                  }
                />
              </div>
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="lastName"
              >
                Last Name
              </label>
              <div className="mt-1">
                <input
                  autoComplete="lastName"
                  className="appearance-none block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  id="lastName"
                  name="name"
                  placeholder="Enter your lastName"
                  required
                  type="text"
                  onChange={(e) =>
                    setFields((c) => ({ ...c, lastName: e.target.value }))
                  }
                />
              </div>
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="phoneNumber"
              >
                Phone Number
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
                  onChange={(e) =>
                    setFields((c) => ({ ...c, phoneNumber: e.target.value }))
                  }
                />
              </div>
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="email"
              >
                Email
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
                  onChange={(e) =>
                    setFields((c) => ({ ...c, email: e.target.value }))
                  }
                />
              </div>
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="dob"
              >
                Date Of Birth
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
                  onChange={(e) =>
                    setFields((c) => ({ ...c, dob: e.target.value }))
                  }
                />
              </div>
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="pin"
              >
                Pin
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
                  onChange={(e) =>
                    setFields((c) => ({ ...c, pin: e.target.value }))
                  }
                />
              </div>
            </div>
            <div classname="">
              <button
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                type="submit"
                onClick={(e) => onSignup(e, fields)}
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
