import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function Navigation() {
  const { currentUser } = useSelector((state) => state.currentUser);
  console.log(currentUser);
  return (
    <div>
      <header>
        <nav className="bg-light-500 shadow-sm border-b justify-center">
          <div className="flex flex-row justify-between items-center py-3 max-w-6xl mx-auto">
            <div className="logo flex flex-row space-x-10 items-center text-m font-medium">
              <Link to="/">Logo</Link>
              <NavLink className="hover:text-emrald font-medium text-sm" to="/">
                Home
              </NavLink>
              <NavLink
                className="hover:text-emrald font-medium text-sm"
                to="about"
              >
                About
              </NavLink>
            </div>
            <div>
              <form
                action=""
                method="get"
                className="border border-slate-300 rounded-3xl p-3 w-96 flex  items-center justify-between shadow-xs"
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
              <ul className="flex flex-row space-x-2 font-inter text-m items-center font-semibold">
                <li>
                  <Link
                    // className="p-1 hover:bg-gray-50 rounded-3xl hover:shadow-xs"
                    to="profile"
                  >
                    {currentUser ? (
                      <div className="flex flex-row items-center gap-3 bg-slate-15 rounded-3xl p-2 hover:bg-slate-50 hover:shadow-xs">
                        <img
                          className="rounded-full h-8 w-8"
                          src={currentUser.avatar}
                          alt="profile avatar"
                          width={50}
                        />
                        <p className="text-sm">{currentUser.username}</p>
                      </div>
                    ) : (
                      <li className="border p-3 rounded text-sm">Login</li>
                    )}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
