import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../redux/orderRedux/orderAction";
import { getMenuItems } from "../redux/menuRedux/menu.action";

function MyOrder() {
  const dispatch = useDispatch();

  // Fetch orders and menu data from Redux
  const orders = useSelector((state) => state.orders.orders);
  const menuItems = useSelector((state) => state.menu.menuItems);

  useEffect(() => {
    dispatch(getOrders());
    dispatch(getMenuItems()); // Ensure menu items are loaded for mapping
  }, [dispatch]);

  // Helper function to match menu item ID with its details
  const getMenuDetails = (menuItemId) =>
    menuItems.find((item) => item._id === menuItemId);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">My Orders</h1>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100 text-gray-800">
              <th className="border border-gray-300 px-4 py-2">Item Name</th>
              <th className="border border-gray-300 px-4 py-2">Category</th>
              <th className="border border-gray-300 px-4 py-2">Price</th>
              <th className="border border-gray-300 px-4 py-2">Quantity</th>
              <th className="border border-gray-300 px-4 py-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {orders && orders.length > 0 ? (
              orders.map((order) =>
                order.items.map((item) => {
                  const menuItem = getMenuDetails(item.menuItem);
                  return menuItem ? (
                    <tr key={item.menuItem}>
                      <td className="border border-gray-300 px-4 py-2">
                        {menuItem.name}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {menuItem.category}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        ₹{menuItem.price}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {item.quantity}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        ₹{menuItem.price * item.quantity}
                      </td>
                    </tr>
                  ) : (
                    <tr key={item.menuItem}>
                      <td
                        colSpan="6"
                        className="border border-gray-300 px-4 py-2 text-center"
                      >
                        Item not found
                      </td>
                    </tr>
                  );
                })
              )
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="border border-gray-300 px-4 py-2 text-center"
                >
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MyOrder;
