import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function Navigation() {
  return (
    (
      <div>
        <ul>
        <li>
            <NavLink to="home">Home</NavLink>
          </li>
          <li>
            <NavLink to="about">About</NavLink>
          </li>
          <li>
            <NavLink to="sign-in">Sign in</NavLink>
          </li>
        </ul>
      </div>
    ),
    (<Outlet />)
  );
}
