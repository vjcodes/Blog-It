import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import authService from "../appwrite/auth";
import { login } from "../store/authSlice";
import { Logo } from ".";
import Input from "./Input";
import Button from "./Button";

type UserSignupParams = {
  email: string;
  password: string;
  name: string;
};

const Signup = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | unknown>("");
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm<UserSignupParams>();

  const create = async (data: UserSignupParams) => {
    setError("");
    try {
      const userData = await authService.createAccount(data);
      if (userData) dispatch(login(userData));
      navigate("/");
    } catch (error: unknown) {
      if (error instanceof Error) {
        // Handle the error if it is an instance of the Error class
        setError((error as Error).message);
      } else if (typeof error === "string") {
        // Handle the error if it's a string
        setError(error);
      } else {
        // Handle other types of errors
        setError("An unknown error occurred");
      }
    }
  };
  return (
    <div className="flex items-center justify-center">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <span className="inline-block w-full max-w-[100px">
          <Logo width="100%" />
        </span>
      </div>
      <h2 className="text-center text-2xl font-bold leading-tight">
        Sign up to create account
      </h2>
      <p className="mt-2 text-center text-base text-black/60">
        Already have an account?&nbsp;
        <Link
          to="/login"
          className="font-medium text-primary transition-all duration-200 hover:underline"
        >
          Sign Up
        </Link>
      </p>

      <p className="text-red-600 mt-8 text-center">
        {typeof error === "string" ? error : "An unknown error occurred"}
      </p>

      <form onSubmit={handleSubmit(create)}>
        <div className="space-y-5">
          <Input
            type="text"
            label="Full Name: "
            placeholder="Enter your full name"
            {...register("name", {
              required: true,
            })}
          />

          <Input
            label="Email: "
            placeholder="Enter your email"
            type="email"
            {...register("email", {
              required: true,
              validate: {
                matchPattern: (value) =>
                  /^\w+([.-]?\w+)*@\w([.-]?\w{2,3})+$/.test(value) ||
                  "Email address must be a valid address",
              },
            })}
          />

          <Input
            label="Password: "
            type="password"
            placeholder="Enter your password"
            {...register("password", { required: true })}
          />

          <Button type="submit" className="w-full">
            Create Account
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
