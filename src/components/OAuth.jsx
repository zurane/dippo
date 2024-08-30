import React from "react";
import googleLogo from "../assets/7123025_logo_google_g_icon.svg"; // Importing a Google logo image for the "Continue with Google" button

export default function OAuth() {
  return (
    <div className="my-3">
      <button className="flex justify-center items-center  w-full bg-white border rounded shadow-sm px-2 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 dark:text-white hover:bg-gray-25 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
        <img src={googleLogo} alt="google G logo" width={25} />
        <span className="text-regular">Sign in with Google</span>
      </button>
    </div>
  );
}
