import { useState } from "react";
import { createContext } from "react";

export const CartContext = createContext();

const CartContextComponent = ({ children }) => {
  const [cart, setCart] = useState([]);
  const addToCart = (product) => {
    let exist = isInCart(product.id);
    if (exist) {
      let elementExist = cart.map((element) => {
        if (element.id === product.id) {
          return { ...element, quantity: element.quantity + product.quantity };
        } else {
          return element;
        }
      });
      setCart(elementExist);
    } else {
      setCart([...cart, product]);
    }
  };
  //funcion si existe el producto en el carrito
  const isInCart = (id) => {
    let exist = cart.some((element) => element.id === id);
    return exist;
  };
  //funcion encontrar el producto para detectar la cantidad
  const getQuantityById = (id) => {
    let productFound = cart.find((element) => element.id === id);
    return productFound?.quantity;
  };
  //borrar productos del carrito
  const clearCart = () => {
    setCart([]);
  };
  // borrar un elemento del carrito
  const deleteProductById = (id) => {
    let productFound = cart.filter((product) => product.id !== id);
    setCart(productFound);
  };
  //obtener el total del carrito
  const getTotalPrice = () => {
    let total = cart.reduce((acc, element) => {
      return acc + element.price * element.quantity;
    }, 0);

    return total;
  };
  //obtener cantidad de elementos
  const getTotalQuantity = () => {
    let total = cart.reduce((acc, element) => {
      return acc + element.quantity;
    }, 0);
    return total;
  };
  let data = {
    cart,
    addToCart,
    getQuantityById,
    clearCart,
    deleteProductById,
    getTotalPrice,
    getTotalQuantity,
  };
  return <CartContext.Provider value={data}>{children}</CartContext.Provider>;
};

export default CartContextComponent;
