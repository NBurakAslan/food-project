import React, { useState } from "react";
import Header from "./components/Layout/Header.js";
import Meals from "./components/Meals/Meals.js";
import Cart from "./components/Cart/Cart.js";
import CartProvider from "./store/CartProvider.js";
function App() {
  const [cardShow, setCardShow] = useState(false);

  const toogleCardShow = () => {
    setCardShow(!cardShow);
  };
  return (
    <CartProvider>
      {cardShow && <Cart toogleCardShow={toogleCardShow} />}
      <Header toogleCardShow={toogleCardShow} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
