import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "./queryKeys";
import { axiosBase } from "../../constatns";

// Restaurant
export const useRestaurant = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.RESTAURANT],
    queryFn: () => axiosBase.get("/restaurant/public"),
  });
};
export const useCategories = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.CATEGORIES],
    queryFn: () => axiosBase.get(`/category/public`),
  });
};
export const useProductsByCategoryID = (categoryId) => {
  return useQuery({
    queryKey: [QUERY_KEYS.PRODUCTS_BY_CAT_ID, categoryId],
    queryFn: () => axiosBase.get(`/product/categoryId/${categoryId}/public`),
    enabled: !!categoryId,
  });
};

export const useProducts = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.PRODUCTS],
    queryFn: () => axiosBase.get(`/product`),
  });
};

export const useProduct = (productId) => {
  return useQuery({
    queryKey: [QUERY_KEYS.PRODUCT, productId],
    queryFn: () => axiosBase.get(`/product/${productId}/public`),
    enabled: !!productId,
  });
};

export const useProductsSearch = (query) => {
  return useQuery({
    queryKey: [QUERY_KEYS.PRODUCTS, query],
    queryFn: () => axiosBase.get(`/product/search?search=${query}`),
    enabled: !!query,
  });
};
export const useOffers = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.OFFERS],
    queryFn: () => axiosBase.get(`/offer`),
  });
};

export const useOffer = (offerId) => {
  return useQuery({
    queryKey: [QUERY_KEYS.OFFER, offerId],
    queryFn: () => axiosBase.get(`/offer/${offerId}/public`),
    enabled: !!offerId,
  });
};

export const useOffersSearch = (query) => {
  return useQuery({
    queryKey: [QUERY_KEYS.OFFERS, query],
    queryFn: () => axiosBase.get(`/offer/search?search=${query}`),
    enabled: !!query,
  });
};
