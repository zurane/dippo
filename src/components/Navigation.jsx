import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

export default function Navigation() {
  return (
    <div>
      <header>
        <nav className="bg-light-500 shadow-sm">
          <div className="flex flex-row justify-between items-center px-5 py-4 max-w-6xl mx-auto">
            <div className="logo flex flex-row space-x-5 items-center text-m font-medium">
              <Link to="/">Dippo</Link>
              <NavLink className="hover:text-emrald" to="/">Home</NavLink>
              <NavLink className="hover:text-emrald" to="about">About</NavLink>
            </div>
            <div>
              <form
                action=""
                method="get"
                className="border border-slate-300 p-3 w-96 flex items-center justify-between "
              >
                <input
                  type="text"
                  placeholder="Search for a place to rent"
                  className="bg-transparent focus:outline-none w-24 sm:w-64"
                />
                <FaSearch className="text-slate-200" />
              </form>
            </div>
            <div className="navigation__links">
              <ul className="flex flex-row space-x-2 font-inter text-m font-semibold">
                <li>
                  <NavLink className="border p-3 rounded text-sm" to="sign-in">
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink className="p-3 text-sm bg-emrald text-white rounded" to="sign-up">
                    Sign up
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
