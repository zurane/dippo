import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Snackbar from "@mui/joy/Snackbar";
import googleLogo from "../assets/7123025_logo_google_g_icon.svg";

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({});

  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;

  const handleClick = (newState) => () => {
    setState({ ...newState, open: true });
  };
  const redirect = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      // set the value of the target input
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    // prevent the window from refresh
    e.preventDefault();
    try {
      // triggers the loader
      setLoading(true);
      // wait for the API call to resolve
      // POST the data to our database
      const res = await fetch("/api/auth/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // convert the form data object into a string
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      redirect("/sign-in");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className="my-10 max-w-sm mx-auto  p-4 shadow-sm">
      {/* if we get an error will show the below message */}
      {error && (
        <div
          className="bg-orange-100 border-l-4 my-2 border-orange-500 text-orange-700 p-2"
          role="alert"
        >
          <p class="font-medium text-sm">Error</p>
          <p className="text-sm">
            User with that username or email already exists.
          </p>
        </div>
      )}
      <h4 className="mb-2 text-2xl font-semibold">Create your account</h4>
      <p className="text-sm pb-5">
        Find the perfect place to call home with ease and peace of mind.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="Create username"
          id="username"
          className="border p-3 text-sm rounded"
          onChange={handleChange}
        />

        <input
          type="email"
          placeholder="Enter your email address"
          id="email"
          className="border p-3 text-sm rounded"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Create your password"
          id="password"
          className="border p-3 text-sm rounded"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          onClick={handleClick({ vertical: 'top', horizontal: 'center' })}
          type="submit"
          className=" bg-black py-3 rounded text-white mt-2 hover:opacity-90"
        >
          {loading == true ? "Loading..." : "Create account"}
        </button>
      </form>
      <div className="py-4 text-center">
        <p className="text-sm pb-2">
          Already have an account?
          <Link className="underline px-1" to="/sign-in">
            Sign in
          </Link>
        </p>
        <span className="text-m text-slate-600">or</span>
      </div>
      <button className="flex justify-center items-center w-full bg-white border rounded shadow-sm px-6 py-1 text-sm font-medium text-gray-800 hover:bg-gray-50 dark:text-white hover:bg-gray-25 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
        <img src={googleLogo} alt="google G logo" width={40} />
        <span>Continue with Google</span>
      </button>
    </div>
  );
}
