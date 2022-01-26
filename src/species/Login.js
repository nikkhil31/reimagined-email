import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAppcontext } from "../context/AppProvider";
import { checkEmailExists } from "../helper/check";
import { useAuth } from "../hook/useAuth";


const Login = ({ type }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [error, setError] = useState("");

  const { signIn, login, error: authError, response } = useAuth();
  const { dispatch } = useAppcontext()

  let navigate = useNavigate();

  const onSubmit = async (data) => {


    if (type === 1) {
      const isExist = await checkEmailExists(data.email);
      if (isExist.status) return setError(isExist.message);
      setError("");

      await signIn(data)
    }

    if (type === 0) {
      await login(data)
    }
  };

  if (response) {
    dispatch({ type: 'LOGIN', payload: response })
    navigate('/', { replace: true })
  }


  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-gray-200 text-gray-700">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col bg-white rounded shadow-lg p-12 mt-12"
      >
        {authError && (<div class="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
          <span class="font-medium">Error</span> {authError.message}
        </div>)}
        {type === 1 ? (
          <div className="mb-2">
            <label className="font-semibold text-xs" htmlFor="usernameField">
              Name
            </label>
            <input
              placeholder="Name"
              {...register("name", {
                required: "Name is required",
              })}
              className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2"
              type="text"
            />
            <span className="text-red-500 font-semibold">
              {errors?.name?.message}
            </span>
          </div>
        ) : (
          ""
        )}
        <div className="mb-2">
          <label className="font-semibold text-xs" htmlFor="usernameField">
            Email
          </label>
          <input
            placeholder="Email"
            {...register("email", {
              required: "Email is required!",
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Please enter a valid email",
              },
            })}
            className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2"
            type="text"
          />
          <span className="text-red-500 font-semibold">
            {errors?.email?.message}
            {error}
          </span>
        </div>
        <div className="mb-2">
          <label className="font-semibold text-xs mt-3" htmlFor="passwordField">
            Password
          </label>
          <input
            placeholder="Password"
            {...register("password", { required: "Password is required!" })}
            className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2"
            type="password"
          />
          <span className="text-red-500 font-semibold">
            {errors?.password?.message}
          </span>
        </div>
        <button
          className="flex items-center justify-center h-12 px-6 w-64 bg-blue-600 mt-8 rounded font-semibold text-sm text-blue-100 hover:bg-blue-700"
          onClick={handleSubmit}
        >
          {type === 0 ? "Login" : "Register"}
        </button>
        <div className="flex mt-6 justify-center text-xs">
          {/* <button className="text-blue-400 hover:text-blue-500" href="#">Forgot Password</button> */}
          {/* <span className="mx-2 text-gray-300">/</span> */}
          <Link
            className="text-blue-400 hover:text-blue-500"
            to={type === 1 ? "/login" : "/register"}
          >
            {type === 1 ? "Login" : "Register"}
          </Link>
        </div>
      </form>
      {/* Component End  */}
    </div>
  );
};

export default Login;
