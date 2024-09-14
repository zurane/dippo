import React from "react";
import { Link } from "react-router-dom";

export default function Profile() {
  return (
    <div>
      <h4>This is a profile page</h4>
      <Link to="/sign-in">Logout</Link>
    </div>
  );
}
