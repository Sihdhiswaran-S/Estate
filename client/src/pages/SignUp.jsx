import React from 'react'
import { Link } from 'react-router-dom';

function SignUp() {
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form action="" className="flex flex-col gap-4 ">
        <input
          type="text"
          placeholder="Username"
          className="border-0 p-3 rounded-lg"
          id="username"
        />
        <input
          type="email"
          placeholder="Email"
          className="border-0 p-3 rounded-lg"
          id="email"
        />
        <input
          type="password"
          placeholder="Password"
          className=" p-3 rounded-lg border-0"
          id="password"
        />
        <button className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 uppercase">
          Sign Up 
        </button>
      </form>
      <div>
        <p className="text-center mt-4">
          Already have an account? <Link to="/sign-in" className="text-blue-500 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp