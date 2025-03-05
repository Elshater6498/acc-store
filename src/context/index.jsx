import { createContext, useState, useContext, useEffect } from "react";
import {
  useCategories,
  useRestaurant,
} from "../lib/react-query/queriesAndMutations";

const CartContext = createContext();

export const AppProvider = ({ children }) => {
  const getInitailCartData = () => {
    const cartData = localStorage.getItem("cartData");
    return cartData ? JSON.parse(cartData) : [];
  };

  const [cartData, setCartData] = useState(getInitailCartData);

  const { data: storeData, isPending: isLoadingStoreData } = useRestaurant();
  const { data: categories, isPending: isLoadingCategories } = useCategories();

  useEffect(() => {
    localStorage.setItem("cartData", JSON.stringify(cartData));
  }, [cartData]);

  // Global addToCart function that can be used across the application
  const addToCart = (itemData, quantity = 1) => {
    const newCartItem = {
      id: itemData?._id,
      name: itemData?.name,
      en_name: itemData?.enName,
      images: itemData?.images || itemData?.image,
      details: itemData?.details,
      en_details: itemData?.enDetails,
      quantity,
      itemPrice: parseFloat((itemData?.itemPrice || 0).toFixed(2)) * quantity,
      itemDiscount: itemData?.itemDiscount,
      purchasePrice:
        parseFloat((itemData?.purchasePrice || 0).toFixed(2)) * quantity,
      sellingPrice:
        parseFloat((itemData?.sellingPrice || 0).toFixed(2)) * quantity,
      profitMargin:
        parseFloat((itemData?.profitMargin || 0).toFixed(2)) * quantity,
    };

    const existingItemIndex = cartData.findIndex(
      (item) => item.id === newCartItem.id && item.name === newCartItem.name
    );

    if (existingItemIndex !== -1) {
      const updatedCartData = [...cartData];
      updatedCartData[existingItemIndex].quantity += newCartItem.quantity;
      updatedCartData[existingItemIndex].itemPrice += newCartItem.itemPrice;
      updatedCartData[existingItemIndex].sellingPrice +=
        newCartItem.sellingPrice;
      updatedCartData[existingItemIndex].purchasePrice +=
        newCartItem.purchasePrice;
      updatedCartData[existingItemIndex].profitMargin +=
        newCartItem.profitMargin;
      setCartData(updatedCartData);
    } else {
      setCartData([...cartData, newCartItem]);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartData,
        setCartData,
        addToCart,
        storeData: storeData?.data,
        categories: categories?.data,
        isLoading: isLoadingStoreData || isLoadingCategories,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useGlobalContext = () => useContext(CartContext);
