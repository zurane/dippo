import { Link, useNavigate } from "react-router-dom";
import googleLogo from "../assets/7123025_logo_google_g_icon.svg"; // Importing a Google logo image for the "Continue with Google" button
// Importing Link for navigation between routes and useNavigate for programmatic navigation
import { useState } from "react"; // Importing useState hook for managing state within the component
import { useDispatch, useSelector } from "react-redux"; // import use dispatch hook from redux to dispatch our actions (functions);
import {
  signInFailure,
  signInSuccess,
  signInStart,
} from "../redux/user/userSlice"; //import our functions from our slice
// import Snackbar from "@mui/joy/Snackbar"; // Commented out Snackbar import, possibly for showing notifications

export default function SignIn() {
  const [formData, setFormData] = useState({}); // State to manage form data input by the user
  const redirect = useNavigate(); // Hook for programmatic navigation after successful sign-up
  const dispatch = useDispatch(); // initialize the dispatch hook / function
  const { loading, error } = useSelector((state) => state.currentUser);

  const handleChange = (e) => {
    setFormData({
      ...formData, // Spread operator to keep existing form data
      [e.target.id]: e.target.value, // Dynamically updating the formData state with the current input value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission which refreshes the page
    try {
      dispatch(signInStart()); // Set loading to true when starting the submission process
      const res = await fetch("/api/auth/sign-in", {
        method: "POST", // Set the HTTP method to GET
        headers: {
          "Content-Type": "application/json", // Set the content type to JSON
        },
        body: JSON.stringify(formData), // Convert the form data object into a JSON string to send in the request body
      });
      const data = await res.json(); // Parse the JSON response from the server
      console.log(data); // Log the response data (for debugging purposes)
      if (data.success === false) {
        dispatch(signInFailure(data.message)); // Set the error message state if the sign-up failed
        return; // Exit the function early if there was an error
      }
      dispatch(signInSuccess(data));
      redirect("/"); // Redirect the user to the sign-in page
    } catch (error) {
      dispatch(signInFailure(error.message));
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
        <h4 className="mb-2 text-xl font-medium ">Sign in</h4>
        <Link className="text-sm text-bold border-b border-b-3 " to="/sign-up">
          I don't have an account
        </Link>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="email"
          placeholder="Enter your email address"
          id="email"
          className="border p-3 py-4 text-sm rounded"
          onChange={handleChange} // Handle input changes by updating the formData state
        />
        <input
          type="password"
          placeholder="Enter your password"
          id="password"
          className="border p-3 py-4 text-sm rounded"
          onChange={handleChange} // Handle input changes by updating the formData state
        />
        <button
          disabled={loading} // Disable the button if the form is in a loading state
          type="submit"
          className=" bg-black py-3 rounded text-white mt-2 hover:opacity-90"
        >
          {loading == true ? "Loggin..." : "Log in"}
          {/* // Show "Loading..." while loading, otherwise "Create account" */}
        </button>
      </form>
      <div className="my-3">
        <button className="flex justify-center items-center  w-full bg-white border rounded shadow-sm px-2 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 dark:text-white hover:bg-gray-25 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
          <img src={googleLogo} alt="google G logo" width={25} />
          <span className="text-regular">Sign in with Google</span>
        </button>
      </div>
    </div>
  );
}
