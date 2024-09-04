import React from "react";
import googleLogo from "../assets/7123025_logo_google_g_icon.svg"; // Importing a Google logo image for the "Continue with Google" button
import { GoogleAuthProvider, getAuth, signInWithPopup } from "@firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

export default function OAuth() {
  const redirect = useNavigate();
  const dispatch = useDispatch();

  async function handleClick() {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const res = await signInWithPopup(auth, provider);
      const req = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: res.user.displayName,
          email: res.user.email,
          avatar: res.user.photoURL,
        }),
      });
      const data = await req.json();
      dispatch(signInSuccess(data));
      redirect("/");
      console.log("successfully loggedin");
    } catch (error) {
      console.log("Sign in failed", error);
    }
  }

  return (
    <div className="my-3">
      <button
        onClick={handleClick}
        type="submit"
        className="flex justify-center items-center  w-full bg-white border rounded shadow-sm px-2 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 dark:text-white hover:bg-gray-25 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
      >
        <img src={googleLogo} alt="google G logo" width={25} />
        <span className="text-regular">Sign in with Google</span>
      </button>
    </div>
  );
}
