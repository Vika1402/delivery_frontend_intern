import React from "react";
import { RiMenu4Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/userRedux/user.action";
import toast from "react-hot-toast";

function Navbar() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    toast.success("User logged out successfully");
    navigate("/", { replace: true });
    window.scrollTo(0, 0); // Scroll to top after logout
  };

  return (
    <div className="xl:text-2xl lg:text-xl md:text-lg">
      <div className="flex justify-between py-4">
        <div>
          <ul>
            <li>Logo</li>
            <li>Food Delivery</li>
          </ul>
        </div>
        <div>
          <ul className="xl:space-x-20 space-x-6 hidden md:flex">
            {user ? (
              // If user is logged in, show full navigation
              <>
                <li>
                  <Link to="/">Menu</Link>
                </li>
                <li>
                  <Link to="/order">Orders</Link>
                </li>
                <li>
                  <Link to="/menulist">Update Menu</Link>
                </li>
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li onClick={handleLogout}>Logout</li>
              </>
            ) : (
              // If user is not logged in, show only login
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}
          </ul>
          <span className="md:hidden block">
            <RiMenu4Fill />
          </span>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
