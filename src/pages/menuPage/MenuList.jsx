import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteMenuItem,
  getMenuItems,
} from "../../redux/menuRedux/menu.action";
import { useNavigate } from "react-router-dom";

const MenuList = () => {
  const dispatch = useDispatch();
  const menudata = useSelector((state) => state.menu.menuItems); // Access menu items from Redux store
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    // Fetch menu items when the component is mounted
    dispatch(getMenuItems());
  }, [dispatch]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Menu List</h1>
      {menudata && menudata.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100 text-gray-800">
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Category</th>
                <th className="border border-gray-300 px-4 py-2">Price</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {menudata.map((item) => (
                <tr key={item._id}>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.category}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    ₹{item.price}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center flex justify-around">
                    <button
                      onClick={() => navigate(`/menu-update/${item._id}`)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => dispatch(deleteMenuItem(item._id))}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500">No menu items found.</p>
      )}
    </div>
  );
};

export default MenuList;
