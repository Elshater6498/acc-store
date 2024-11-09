import { createContext, useState, useContext, useEffect } from 'react'
import {
  useCategories,
  useRestaurant,
} from '../lib/react-query/queriesAndMutations'

const CartContext = createContext()

export const AppProvider = ({ children }) => {
  const getInitailCartData = () => {
    const cartData = localStorage.getItem('cartData')
    return cartData ? JSON.parse(cartData) : []
  }

  const [cartData, setCartData] = useState(getInitailCartData)

  const { data: storeData, isPending: isLoadingStoreData } = useRestaurant()
  const { data: categories, isPending: isLoadingCategories } = useCategories()

  useEffect(() => {
    localStorage.setItem('cartData', JSON.stringify(cartData))
  }, [cartData])
  return (
    <CartContext.Provider
      value={{
        cartData,
        setCartData,
        storeData: storeData?.data,
        categories: categories?.data,
        isLoading: isLoadingStoreData || isLoadingCategories,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useGlobalContext = () => useContext(CartContext)
