import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";

const Form = ({ isSignInPage = false }) => {
  const [data, setdata] = useState({
    ...(!isSignInPage && {
      fullName: "",
    }),
    email: "",
    password: "",
  });
  const naviagte = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("data :>>", data);
    const response = await fetch(
      `http://localhost:8000/api/${isSignInPage ? "login" : "register"}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (response.status === 400) {
      alert("Invaild credentials");
    } else {
      const resData = await response.json();
      if (resData.token) {
        localStorage.setItem("user:token", resData.token);
        localStorage.setItem("user:detail", JSON.stringify(resData.user));
        naviagte("/");
      }
    }
  };
  return (
    <>
      <div className="bg-light flex justify-center items-center ">
        <div className="bg-white w-[600px] h-[600px] shadow-lg rounded-lg flex flex-col justify-center items-center mt-14">
          <div className="text-4xl font-extrabold">
            Welcome {isSignInPage && "Back"}
          </div>
          <div className="text-xl font-light mb-14">
            {isSignInPage ? "Sign in to get explore" : "Sign up to get started"}
          </div>
          <form
            className="flex flex-col items-center w-full"
            onSubmit={(e) => handleSubmit(e)}
          >
            {!isSignInPage && (
              <Input
                label="Full name"
                name="name"
                placeholder="Enter your full name"
                className="mb-6 w-[75%]"
                value={data.fullName}
                onChange={(e) => setdata({ ...data, fullName: e.target.value })}
              />
            )}
            <Input
              label="Email address"
              name="email"
              placeholder="Enter your email"
              type="email"
              className="mb-6 w-[75%]"
              value={data.email}
              onChange={(e) => setdata({ ...data, email: e.target.value })}
            />
            <Input
              label="Password"
              type="password"
              name="password"
              placeholder="Enter your full Password"
              className="mb-10 w-[75%]"
              value={data.password}
              onChange={(e) => setdata({ ...data, password: e.target.value })}
            />
            <Button
              label={isSignInPage ? "Sign In" : "Sign Up"}
              type="submit"
              className="w-[75%] mb-3"
            />
          </form>
          <div>
            {isSignInPage
              ? "Didn't have an account?"
              : "Already have an account?"}
            <span
              className="text-primary cursor-pointer underline"
              onClick={() =>
                naviagte(`/users/${isSignInPage ? "sign_up" : "sign_in"}`)
              }
            >
              {isSignInPage ? "Sign Up" : "Sign In"}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Form;
