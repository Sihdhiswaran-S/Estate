import React from 'react'
import { useSelector } from 'react-redux';
function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="p-3 mx-auto max-w-lg ">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-3   bg-slate-100 p-5 rounded-lg">
        <img
          src={currentUser.avatar}
          alt="profile"
          className="h-25 w-25 rounded-full object-cover mt-2 cursor-pointer self-center"
        />
        <input
          type="text"
          placeholder="username"
          id='username'
          className="border p-3 rounded-lg"
        />
        <input
          type="email"
          placeholder="email"
          id='email'
          className="border p-3 rounded-lg"
        />
        
        <input
          type="password"
          placeholder="password"
          id='password'
          className="border p-3 rounded-lg"
        />
        <button className="bg-slate-600 text-white p-3 rounded-lg hover:opacity-90 uppercase">
          Update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 font-semibold uppercase cursor-pointer">Deleted Account</span>
        <span className="text-red-700 font-semibold uppercase cursor-pointer">sign out</span>
      </div>
    </div>
  );
}

export default Profile