import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMenuItems } from "../../redux/menuRedux/menu.action";
import PlaceOrderComponent from "../../componenets/PlaceOrderComponent";

const Menu = () => {
  const dispatch = useDispatch();
  const menudata = useSelector((state) => state.menu.menuItems);
  const [cart, setCart] = useState([]);
  const [isOrderVisible, setIsOrderVisible] = useState(false); // To toggle between menu and order component

  useEffect(() => {
    dispatch(getMenuItems());
  }, [dispatch]);

  const addToCart = (menuItem) => {
    setCart((prevCart) => {
      const itemExists = prevCart.find(
        (item) => item.menuItem === menuItem._id
      );
      if (itemExists) {
        return prevCart.map((item) =>
          item.menuItem === menuItem._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { menuItem: menuItem._id, quantity: 1 }];
    });

    alert(`${menuItem.name} added to cart!`);
  };

  const handlePlaceOrder = () => {
    setIsOrderVisible(true); // Show PlaceOrderComponent
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {!isOrderVisible ? (
        <>
          <h1 className="text-2xl font-bold mb-6 text-center">Menu</h1>
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100 text-gray-800">
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Name
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Price
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Category
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-center">
                    Add to Cart
                  </th>
                </tr>
              </thead>
              <tbody>
                {menudata.map((item) => (
                  <tr key={item._id}>
                    <td className="border border-gray-300 px-4 py-2">
                      {item.name}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      ₹{item.price}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {item.category}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        onClick={() => addToCart(item)}
                      >
                        Add to Cart
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {cart.length > 0 && (
            <div className="mt-4 text-center">
              <button
                onClick={handlePlaceOrder}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Go to Checkout
              </button>
            </div>
          )}
        </>
      ) : (
        <PlaceOrderComponent cart={cart} />
      )}
    </div>
  );
};

export default Menu;
