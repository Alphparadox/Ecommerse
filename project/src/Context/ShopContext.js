import React, { createContext, useState, useEffect } from "react";
import all_product from "../Components/Assets/all_product";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  return [];
};

const ShopContextProvider = (props) => {
  const [cartItem, setCartItem] = useState(getDefaultCart);

  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem("auth-token");
      if (token) {
        const response = await fetch("http://localhost:4000/getcart", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "auth-token": token,
          },
        });
        const data = await response.json();
        setCartItem(Array.isArray(data) ? data : []);
      }
    };
    fetchCart();
  }, []);

  const getTotalAmount = () => {
    if (!Array.isArray(cartItem)) return 0;
    return cartItem.reduce((total, item) => {
      const itemInfo = all_product.find((product) => product.id === item.id);
      return total + itemInfo.new_price * item.quantity;
    }, 0);
  };

  const getTotalItem = () => {
    if (!Array.isArray(cartItem)) return 0;
    return cartItem.reduce((total, item) => total + item.quantity, 0);
  };

  const addToCart = async (itemId, size) => {
    const token = localStorage.getItem("auth-token");
    if (token) {
      const existingItem = cartItem.find(
        (item) => item.id === itemId && item.size === size
      );

      if (existingItem) {
        setCartItem((prevCart) =>
          prevCart.map((item) =>
            item.id === itemId && item.size === size
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        );
      } else {
        setCartItem((prevCart) => [
          ...prevCart,
          { id: itemId, size, quantity: 1 },
        ]);
      }

      const response = await fetch("http://localhost:4000/addtocart", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify({ itemId, size }),
      });
      const data = await response.json();
      console.log(data);
    }
  };

  const removeFromCart = async (itemId, size) => {
    const token = localStorage.getItem("auth-token");
    if (token) {
      const existingItem = cartItem.find(
        (item) => item.id === itemId && item.size === size
      );

      if (existingItem) {
        if (existingItem.quantity > 1) {
          setCartItem((prevCart) =>
            prevCart.map((item) =>
              item.id === itemId && item.size === size
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
          );
        } else {
          setCartItem((prevCart) =>
            prevCart.filter((item) => !(item.id === itemId && item.size === size))
          );
        }

        const response = await fetch("http://localhost:4000/remove", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "auth-token": token,
          },
          body: JSON.stringify({ itemId, size }),
        });
        const data = await response.json();
        console.log(data);
      }
    }
  };

  const contextValue = {
    all_product,
    getTotalItem,
    getTotalAmount,
    cartItem,
    addToCart,
    removeFromCart,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
