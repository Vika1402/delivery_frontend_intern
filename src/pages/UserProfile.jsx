import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function UserProfile() {
  const user = useSelector((state) => state.user.user);
  return (
    <div>
      {user ? (
        <div className="card bg-primary text-primary-content ">
          <div className="card-body">
            <h2 className="card-title">username: {user.username}</h2>
            <p>{user.email}</p>
            <p>admin status:{user.isAdmin}contact service provider</p>

            {
              <Link to={"/addmenu"} className="btn btn-accent">
                Add Menu
              </Link>
            }
          </div>
        </div>
      ) : (
        <>
          <div className="card bg-primary text-primary-content ">
            <div className="card-body">
              <h2 className="card-title">User Not Login</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <div className="card-actions justify-end">
                <Link className="btn" to={"/login"}>
                  Click to Login
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default UserProfile;
