import React, { useState } from "react";
import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateUserStart,
  updateUserError,
  updateUserSuccess,
} from "../redux/user/UserSlice";
function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(null);
  const [updatedSuccess, setUpdatedSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserError(data.message || "Update failed"));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdatedSuccess(true);
    } catch (error) {
      dispatch(updateUserError(error.message));
    }
  };

  return (
    <div className="p-3 mx-auto max-w-lg ">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3   bg-slate-100 p-5 rounded-lg">
        <input type="file" ref={fileInputRef} accept="image/*" hidden />
        <img
          src={
            currentUser?.avatar ||
            "https://img.magnific.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740&q=80"
          }
          alt="profile"
          onClick={() => fileInputRef.current?.click()}
          className="h-25 w-25 rounded-full object-cover mt-2 cursor-pointer self-center"
        />
        <input
          type="text"
          placeholder="username"
          id="username"
          className="border p-3 rounded-lg "
          onChange={handleChange}
          value={formData?.username || currentUser?.username}
        />
        <input
          type="email"
          placeholder="email"
          id="email"
          className="border p-3 rounded-lg"
          onChange={handleChange}
          value={formData?.email || currentUser?.email}
        />

        <input
          type="password"
          placeholder="password"
          id="password"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          type="submit"
          className="bg-slate-600 text-white p-3 rounded-lg hover:opacity-90 uppercase">
          {loading ? "Loading..." : "Update"}
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 font-semibold uppercase cursor-pointer">
          Deleted Account
        </span>
        <span className="text-red-700 font-semibold uppercase cursor-pointer">
          sign out
        </span>
      </div>
      
      <p className="text-red-700 font-semibold uppercase mt-5">{error ? error : ''}</p>
      <p className="text-green-700 font-semibold uppercase mt-5">{updatedSuccess ? "Profile updated successfully!" : ''}</p>
    </div>
  );
}

export default Profile;
