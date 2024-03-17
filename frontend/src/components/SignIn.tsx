import { SignInInput } from "@kamrankhan027/common-app";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputBox from "./InputBox";
import axios from "axios";
import { API_URL } from "../config";

const SignIn = () => {
  const [signInDetails, setSignInDetails] = useState<SignInInput>({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const signInUser = async () => {
    setIsLoading(true);
    const resp = await axios.post(
      `${API_URL}/api/v1/user/signin`,
      signInDetails
    );
    setIsLoading(false);
    const token = resp.data.token;
    localStorage.setItem("token", token);
    navigate("/blog/2");
    setSignInDetails({ email: "", password: "" });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen ">
        <div
          className="animate-spin inline-block size-8 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
          role="status"
          aria-label="loading"
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen ">
      <div className="flex flex-col items-start gap-2 w-1/2">
        <div className="flex flex-col items-center text-center  w-full">
          <div className="text-4xl font-extrabold ">Sign In account</div>
          <div className="text-md font-semibold mb-5">
            Don't have a account?{" "}
            <Link
              className="hover:underline gray-300 cursor-pointer"
              to={"/signup"}
            >
              {" "}
              Sign Up
            </Link>{" "}
          </div>
        </div>
        <InputBox
          label="Email"
          value={signInDetails.email}
          placeholder="Enter email"
          onChange={(e) => {
            setSignInDetails((obj) => ({ ...obj, email: e.target.value }));
          }}
        />
        <InputBox
          label="Password"
          value={signInDetails.password}
          placeholder="Enter password"
          type="password"
          onChange={(e) => {
            setSignInDetails((obj) => ({ ...obj, password: e.target.value }));
          }}
        />
        <button
          className="bg-black text-white w-full rounded-md p-2"
          onClick={signInUser}
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default SignIn;
