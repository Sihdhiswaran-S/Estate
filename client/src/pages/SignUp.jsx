import React, { useState } from "react";
import { Link , useNavigate} from "react-router-dom";

function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handlechange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  console.log(formData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    setLoading(true);
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }); // Handle form submission logic here, such as sending data to the server

    const data = await res.json();
    if (data.success === false) {
      setError(data.message);
      setLoading(false);
      return;
    }
    setLoading(false);
    setError(null);
    console.log(data);
    navigate("/sign-in");
    } catch (error) {
      setError(error.message);
      setLoading(false);  
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
        <input
          type="text"
          placeholder="Username"
          className="border-0 p-3 rounded-lg"
          id="username"
          onChange={handlechange}
        />
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
        <button disabled={loading} className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 uppercase">
         {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
      <div>
        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/sign-in" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
      {error && <p className="text-red-500 text-center mt-4">{error }</p>}
    </div> 
  );
}

export default SignUp;
