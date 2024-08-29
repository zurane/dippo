import { Link, NavLink, useNavigate } from "react-router-dom"; // Importing Link for navigation between routes and useNavigate for programmatic navigation
import { useState } from "react"; // Importing useState hook for managing state within the component
// import Snackbar from "@mui/joy/Snackbar"; // Commented out Snackbar import, possibly for showing notifications
import googleLogo from "../assets/7123025_logo_google_g_icon.svg"; // Importing a Google logo image for the "Continue with Google" button

export default function SignUp() {
  const [loading, setLoading] = useState(false); // State to manage the loading state of the form
  const [error, setError] = useState(null); // State to manage error messages
  const [formData, setFormData] = useState({}); // State to manage form data input by the user

  const redirect = useNavigate(); // Hook for programmatic navigation after successful sign-up

  const handleChange = (e) => {
    setFormData({
      ...formData, // Spread operator to keep existing form data
      [e.target.id]: e.target.value, // Dynamically updating the formData state with the current input value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission which refreshes the page

    try {
      setLoading(true); // Set loading to true when starting the submission process

      const res = await fetch("/api/auth/sign-up", {
        method: "POST", // Set the HTTP method to POST
        headers: {
          "Content-Type": "application/json", // Set the content type to JSON
        },
        body: JSON.stringify(formData), // Convert the form data object into a JSON string to send in the request body
      });

      const data = await res.json(); // Parse the JSON response from the server
      console.log(data); // Log the response data (for debugging purposes)

      if (data.success === false) {
        setLoading(false); // Stop the loading state if there was an error
        setError(data.message); // Set the error message state if the sign-up failed
        return; // Exit the function early if there was an error
      }

      setLoading(false); // Stop the loading state after successful sign-up
      setError(null); // Clear any existing error messages
      redirect("/sign-in"); // Redirect the user to the sign-in page
    } catch (error) {
      setLoading(false); // Stop the loading state if there was an error during the fetch
      setError(error.message); // Set the error state with the error message
    }
  };

  return (
    <div className="my-10 max-w-sm mx-auto border p-4 shadow-sm rounded">
      {/* Conditionally render an error message if there's an error */}
      {error && (
        <div
          className="bg-orange-100 border-l-4 my-2 border-orange-500 text-orange-700 p-2"
          role="alert"
        >
          <p class="font-medium text-sm">Error</p>
          <p className="text-sm">{error}</p>
        </div>
      )}

      <div className="flex flex-row justify-between items-center pb-3">
        <h4 className="mb-2 text-xl font-medium ">Sign up</h4>
        <Link className="text-sm text-bold border-b border-b-3" to="/sign-in">
          I have an account
        </Link>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="Create username"
          id="username"
          className="border p-3 py-4 text-sm rounded"
          onChange={handleChange} // Handle input changes by updating the formData state
        />

        <input
          type="email"
          placeholder="Enter your email address"
          id="email"
          className="border p-3 py-4 text-sm rounded"
          onChange={handleChange} // Handle input changes by updating the formData state
        />
        <input
          type="password"
          placeholder="Create your password"
          id="password"
          className="border p-3 py-4 text-sm rounded"
          onChange={handleChange} // Handle input changes by updating the formData state
        />
        <span className="text-xs">
          I agree to the Terms and Conditions and Privacy
          Policy. 
        </span>
        <button
          disabled={loading} // Disable the button if the form is in a loading state
          type="submit"
          className=" bg-black py-3 rounded text-white mt-2 hover:opacity-90"
        >
          {loading == true ? "Loading..." : "Agree and continue"}
          {/* // Show "Loading..." while loading, otherwise "Create account" */}
        </button>
      </form>
      <div className="my-3">
        <button className="flex justify-center items-center  w-full bg-white border rounded shadow-sm px-2 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 dark:text-white hover:bg-gray-25 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
          <img src={googleLogo} alt="google G logo" width={25} />
          <span className="text-regular">Sign up with Google</span>
        </button>
      </div>
    </div>
  );
}
