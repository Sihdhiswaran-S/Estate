import React from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/UserSlice";
import { useNavigate } from "react-router-dom";
export default function OAuth() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleGoogleclick = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth, provider);
            console.log(result);
            const res = await fetch("/api/auth/google", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name: result.user.displayName,
                email: result.user.email,
                photoURL: result.user.photoURL,
              }),
            });
            const data = await res.json();
            dispatch(signInSuccess(data.rest));
            navigate("/");
            console.log(data);
        } catch (error) {
            console.error("could not connect with Google",error);
        }
    };
  return (
    <button
      type="button"
      className="bg-red-600 text-white p-3.5 rounded-lg hover:bg-red-700 uppercase"
      onClick={handleGoogleclick}>
      Connect with Google
    </button>
  );
}
