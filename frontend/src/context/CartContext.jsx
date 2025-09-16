import { createContext, useContext, useReducer, useEffect } from "react";

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const existingItem = state.cartItems.find(
        (item) => item._id === action.payload._id
      );

      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item._id === existingItem._id
              ? { ...item, qty: item.qty + action.payload.qty }
              : item
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, action.payload],
        };
      }

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item._id !== action.payload),
      };

    case "UPDATE_CART_QUANTITY":
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item._id === action.payload.id
            ? { ...item, qty: action.payload.qty }
            : item
        ),
      };

    case "CLEAR_CART":
      return {
        ...state,
        cartItems: [],
      };

    case "SAVE_SHIPPING_ADDRESS":
      return {
        ...state,
        shippingAddress: action.payload,
      };

    case "SAVE_PAYMENT_METHOD":
      return {
        ...state,
        paymentMethod: action.payload,
      };

    default:
      return state;
  }
};

// ✅ Safe localStorage getter (stale data handle karta hai)
const getFromLocalStorage = (key, defaultValue) => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : defaultValue;
  } catch {
    return defaultValue;
  }
};

export const CartProvider = ({ children }) => {
  const initialState = {
    cartItems: getFromLocalStorage("cartItems", []),
    shippingAddress: getFromLocalStorage("shippingAddress", {}),
    paymentMethod: getFromLocalStorage("paymentMethod", ""),
  };

  const [state, dispatch] = useReducer(cartReducer, initialState);

  // ✅ Save cart items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
  }, [state.cartItems]);

  // ✅ Save shipping address
  useEffect(() => {
    localStorage.setItem(
      "shippingAddress",
      JSON.stringify(state.shippingAddress)
    );
  }, [state.shippingAddress]);

  // ✅ Save payment method
  useEffect(() => {
    localStorage.setItem("paymentMethod", JSON.stringify(state.paymentMethod));
  }, [state.paymentMethod]);

  // 👉 Add item
  const addToCart = (product, qty = 1) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        _id: product._id,            // frontend ke liye
        product: product._id,        // 👈 backend ke liye required field
        name: product.name,
        image: product.image,
        price: product.price,
        countInStock: product.countInStock,
        qty,
      },
    });
  };

  // 👉 Remove item
  const removeFromCart = (id) => {
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: id,
    });
  };

  // 👉 Update qty
  const updateCartQuantity = (id, qty) => {
    dispatch({
      type: "UPDATE_CART_QUANTITY",
      payload: { id, qty },
    });
  };

  // 👉 Clear cart
  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
    localStorage.removeItem("cartItems"); // ✅ storage se bhi clear
  };

  // 👉 Save shipping address
  const saveShippingAddress = (data) => {
    dispatch({
      type: "SAVE_SHIPPING_ADDRESS",
      payload: data,
    });
  };

  // 👉 Save payment method
  const savePaymentMethod = (data) => {
    dispatch({
      type: "SAVE_PAYMENT_METHOD",
      payload: data,
    });
  };

  // 👉 Cart totals
  const cartTotals = () => {
    const itemsPrice = state.cartItems.reduce(
      (acc, item) => acc + item.price * item.qty,
      0
    );
    const shippingPrice = itemsPrice > 100 ? 0 : 10;
    const taxPrice = Number((0.15 * itemsPrice).toFixed(2));
    const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2);

    return {
      itemsPrice: itemsPrice.toFixed(2),
      shippingPrice: shippingPrice.toFixed(2),
      taxPrice,
      totalPrice,
    };
  };

  return (
    <CartContext.Provider
      value={{
        cartItems: state.cartItems,
        shippingAddress: state.shippingAddress,
        paymentMethod: state.paymentMethod,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        saveShippingAddress,
        savePaymentMethod,
        cartTotals,
        itemCount: state.cartItems.reduce((acc, item) => acc + item.qty, 0),
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
