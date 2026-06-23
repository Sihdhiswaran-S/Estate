import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInError,
  signInSuccess,
} from "../redux/user/UserSlice";
function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handlechange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  console.log(formData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }); // Handle form submission logic here, such as sending data to the server

      const data = await res.json();
      if (data.success === false) {
        dispatch(signInError(data.message));
        return;

      }
      dispatch(signInSuccess(data.rest));
      console.log(data);
      navigate("/");
    } catch (error) {
      dispatch(signInError(error.message));
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
        <input
          type="email"
          placeholder="Email"
          className="border-0 p-3 rounded-lg"
          id="email"
          onChange={handlechange}
        />
        <input
          type="password"
          placeholder="Password"
          className=" p-3 rounded-lg border-0"
          id="password"
          onChange={handlechange}
        />
        <button
          disabled={loading}
          className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 uppercase">
          {loading ? "Signing In..." : "Sign In"}
        </button>
      </form>
      <div>
        <p className="text-center mt-4">
          Don't have an account?{" "}
          <Link to="/sign-up" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
    </div>
  );
}

export default SignIn;
