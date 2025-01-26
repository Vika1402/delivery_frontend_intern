import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getMenuItems,
  updateMenuItems,
} from "../../redux/menuRedux/menu.action";
import toast from "react-hot-toast";

function MenuUpdate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    availability: true,
  });

  const menudata = useSelector((state) => state.menu.menuItems);

  // Fetch menu items and populate the form if the menu item exists
  useEffect(() => {
    dispatch(getMenuItems());
  }, [dispatch]);

  useEffect(() => {
    if (menudata && menudata.length > 0) {
      const menuItem = menudata.find((item) => item._id === id);
      if (menuItem) {
        setFormData({
          name: menuItem.name,
          category: menuItem.category,
          price: menuItem.price,
          availability: menuItem.availability,
        });
      }
    }
  }, [menudata, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "availability" ? value === "true" : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = { ...formData };

    dispatch(updateMenuItems(id, updatedData));
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="h-full w-[50%] mt-10 items-center justify-center flex-col">
        {menudata && menudata.length > 0 ? (
          <div className="gap-4 mt-10">
            {/* Use .find() to get the menu item with the specific id */}
            {menudata.find((item) => item._id === id) && (
              <div key={id} className="card bg-neutral text-neutral-content">
                <div className="card-body items-center text-center">
                  <h2 className="card-title">
                    Menu Item Name:{" "}
                    <span className="text-blue-300">
                      {menudata.find((item) => item._id === id).name}
                    </span>
                  </h2>
                  <h2 className="card-title">
                    Menu Price:{" "}
                    <span className="text-blue-300">
                      {menudata.find((item) => item._id === id).price}
                    </span>
                  </h2>
                  <h2 className="card-title">
                    Menu Category:{" "}
                    <span className="text-blue-300">
                      {menudata.find((item) => item._id === id).category}
                    </span>
                  </h2>
                  <h2 className="card-title">
                    Menu Availability:{" "}
                    <span className="text-blue-300">
                      {menudata.find((item) => item._id === id).availability
                        ? "Available"
                        : "Unavailable"}
                    </span>
                  </h2>
                </div>
              </div>
            )}
          </div>
        ) : (
          <p>No menu items found.</p>
        )}
      </div>

      <div className="w-[50%] mt-20">
        <div className="flex items-center justify-center">
          <form
            onSubmit={handleSubmit}
            className="bg-gray-800 w-full shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <div className="mb-4">
              <label
                className="block text-white text-sm font-bold mb-2"
                htmlFor="name"
              >
                Menu Item Name
              </label>
              <input
                required
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                name="name"
                value={formData.name}
                placeholder="Enter menu item name"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-white text-sm font-bold mb-2"
                htmlFor="category"
              >
                Category
              </label>
              <input
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                id="category"
                type="text"
                name="category"
                value={formData.category}
                placeholder="Enter category (e.g., hot drink)"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-white text-sm font-bold mb-2"
                htmlFor="price"
              >
                Price
              </label>
              <input
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                id="price"
                type="number"
                value={formData.price}
                name="price"
                placeholder="Enter price"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-white text-sm font-bold mb-2"
                htmlFor="availability"
              >
                Availability
              </label>
              <select
                value={formData.availability}
                onChange={handleChange}
                name="availability"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value={true}>Available</option>
                <option value={false}>Not Available</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Update Menu Item
              </button>
              <button
                onClick={() => navigate("/")}
                type="button"
                className="bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default MenuUpdate;
