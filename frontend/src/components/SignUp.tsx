import { SignUpInput } from "@kamrankhan027/common-app";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputBox from "./InputBox";
import axios from "axios";
import { API_URL } from "../config";

const SignUp = () => {
  const [signUpDetails, setSignUpDetails] = useState<SignUpInput>({
    email: "",
    password: "",
    name: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const signUpUser = async () => {
    try {
      setIsLoading(true);
      const resp = await axios.post(
        `${API_URL}/api/v1/user/signup`,
        signUpDetails
      );
      setIsLoading(true);
      const token = resp.data.token;
      localStorage.setItem("token", token);
      navigate("/blog/2");
      setSignUpDetails({
        email: "",
        name: "",
        password: "",
      });
    } catch (error) {
      alert(error);
    }
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
          <div className="text-4xl font-extrabold ">Create an account </div>
          <div className="text-md font-semibold mb-5">
            Already have an account?{" "}
            <Link
              className="hover:underline gray-300 cursor-pointer"
              to={"/signin"}
            >
              {" "}
              Login
            </Link>{" "}
          </div>
        </div>
        <InputBox
          value={signUpDetails.name}
          label="Username"
          placeholder="Enter username"
          onChange={(e) => {
            setSignUpDetails((obj) => ({ ...obj, name: e.target.value }));
          }}
        />
        <InputBox
          label="Email"
          value={signUpDetails.email}
          placeholder="Enter email"
          onChange={(e) => {
            setSignUpDetails((obj) => ({ ...obj, email: e.target.value }));
          }}
        />
        <InputBox
          label="Password"
          value={signUpDetails.password}
          placeholder="Enter password"
          type="password"
          onChange={(e) => {
            setSignUpDetails((obj) => ({ ...obj, password: e.target.value }));
          }}
        />
        <button
          className="bg-black text-white w-full rounded-md p-2"
          onClick={signUpUser}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default SignUp;
