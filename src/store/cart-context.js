import React from "react";

const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  add: () => {},
  remove: () => {},
});

export default CartContext;
