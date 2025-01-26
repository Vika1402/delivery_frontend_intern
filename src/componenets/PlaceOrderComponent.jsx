import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { placeOrder } from "../redux/orderRedux/orderAction";
import { getMenuItems } from "../redux/menuRedux/menu.action";
import toast from "react-hot-toast";

const PlaceOrderComponent = ({ cart }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  // Fetch menu data from Redux
  const menuItems = useSelector((state) => state.menu.menuItems);
  const { loading, error, success } = useSelector((state) => state.orders);

  // Fetch menu items on component load
  useEffect(() => {
    dispatch(getMenuItems()); // Ensure menu items are loaded for mapping
  }, [dispatch]);

  // Helper function to match menu item ID with its details
  const getMenuDetails = (menuItemId) =>
    menuItems.find((item) => item._id === menuItemId);

  // Handle placing the order
  const handlePlaceOrder = () => {
    dispatch(placeOrder({ items: cart }));
  };

  // Toast notifications for success and error
  useEffect(() => {
    if (error === "Request failed with status code 401") {
      toast.error("Login required");
    }
    if (success) {
      toast.success("Order placed successfully");
    }
  }, [error, success]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Review Your Order</h1>
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100 text-gray-800">
            <th className="border border-gray-300 px-4 py-2 text-left">Item</th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Quantity
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Price
            </th>
          </tr>
        </thead>
        <tbody>
          {user &&
            cart &&
            cart.map((item, index) => {
              const menuItem = getMenuDetails(item.menuItem);
              return menuItem ? (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2">
                    {menuItem.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.quantity}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    ₹{menuItem.price}
                  </td>
                </tr>
              ) : (
                <tr key={index}>
                  <td
                    colSpan="3"
                    className="border border-gray-300 px-4 py-2 text-center"
                  >
                    Item not found
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <div className="mt-4 text-center">
        {loading ? (
          <p>Placing your order...</p>
        ) : (
          <button
            onClick={handlePlaceOrder}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Place Order
          </button>
        )}
      </div>
    </div>
  );
};

export default PlaceOrderComponent;
