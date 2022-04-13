import React, { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = { items: [], totalAmount: 0 };
const cartReducer = (state, action) => {
  if (action.type === "ADDITEM") {
    const updatedItems = state.items.concat(action.item);
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;
    return { items: updatedItems, totalAmount: updatedTotalAmount };
  }
  return defaultCartState;
};

const CartProvider = (props) => {
  const [stateCart, dispatchCart] = useReducer(cartReducer, defaultCartState);

  const addItemHandler = (item) => {
    dispatchCart({ type: "ADDITEM", item: item });
  };
  const removeItemHandler = (id) => {
    dispatchCart({ type: "REMOVEITEM", id: id });
  };

  const CartProvider = {
    items: stateCart.items,
    totalAmount: stateCart.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
  };
  return (
    <CartContext.Provider value={CartProvider}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
