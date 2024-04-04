import { Link, Outlet } from "react-router-dom";

export default function () {
  return (
    <div>
      <div class="dropdown">
        <button class="dropbtn ">Employee</button>
        <div class="dropdown-content">
        <Link to="/employee">Register</Link>
        <Link to="/login">Login</Link>
        <Link to="/employees">Display Employees</Link>
      </div>
    </div>
<Outlet></Outlet>
    </div>
  );
}