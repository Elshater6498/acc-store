import { useState } from "react";
import { useTranslation } from "react-i18next";
import { IoRemoveCircleOutline, IoAddCircleOutline } from "react-icons/io5";
import { FiX } from "react-icons/fi";
import { useGlobalContext } from "../context";
import { BASE_URL_Img } from "../constatns";

const CartItem = ({ item, done = false }) => {
  const { setCartData } = useGlobalContext();
  const [oldItemPrice] = useState(item.itemPrice / item.quantity);
  const [oldPurchasePrice] = useState(item.purchasePrice / item.quantity);
  const [oldSellingPrice] = useState(item.sellingPrice / item.quantity);
  const [oldProfitMargin] = useState(item.profitMargin / item.quantity);
  const { t, i18n } = useTranslation();

  const add = () => {
    setCartData((prev) => {
      ++item.quantity;
      item.itemPrice = oldItemPrice * item.quantity;
      item.purchasePrice = oldPurchasePrice * item.quantity;
      item.sellingPrice = oldSellingPrice * item.quantity;
      item.profitMargin = oldProfitMargin * item.quantity;
      return [...prev];
    });
  };
  const remove = () => {
    if (item.quantity === 1) return;
    setCartData((prev) => {
      --item.quantity;
      item.itemPrice = oldItemPrice * item.quantity;
      item.purchasePrice = oldPurchasePrice * item.quantity;
      item.sellingPrice = oldSellingPrice * item.quantity;
      item.profitMargin = oldProfitMargin * item.quantity;
      return [...prev];
    });
  };
  const removeItem = (product) => {
    setCartData((prev) => {
      return prev.filter((item) => {
        if (item.id !== product.id || item.name !== product.name) {
          return true;
        }
        return false;
      });
    });
  };

  return (
    <div className={`w-full ${done ? "pointer-events-none" : ""}`}>
      <div className="relative w-full h-28 rounded-lg grid grid-cols-12 gap-2 cursor-pointer bg-gray-100 dark:bg-gray-900">
        {item.itemDiscount && item.itemDiscount > 0 && (
          <div
            className={`absolute top-3 ${
              i18n.language === "en" ? "right-1" : "left-1"
            } bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md shadow-md transform -rotate-12 z-10`}
          >
            - {item.itemDiscount}%
          </div>
        )}
        <div className="relative w-full rounded-lg col-span-4 sm:col-span-3 flex items-center justify-center">
          <div>
            <img
              className="absolute inset-0 w-full h-full p-0.5  rounded-lg object-cover"
              src={
                Array.isArray(item.images) && item.images.length > 0
                  ? BASE_URL_Img + item.images[item.images.length - 1]?.path
                  : typeof item.images === "string"
                  ? BASE_URL_Img + item.images
                  : "/logo.jpg"
              }
              alt={i18n.language === "en" ? item.en_name : item.name}
            />
          </div>
        </div>
        <div className="w-full relative col-span-8 sm:col-span-9 space-y-1 px-2 flex flex-col justify-between">
          {(item.name || item.en_name) && (
            <div className="mt-2 text-sm text-main font-semibold dark:text-white">
              {i18n.language === "en"
                ? item.en_name?.length > 30
                  ? `${item.en_name?.slice(0, 25)}...`
                  : item?.en_name
                : item.name?.length > 30
                ? `${item.name?.slice(0, 25)}...`
                : item?.name}
            </div>
          )}
          {(item.details || item.en_details) && (
            <div className="flex flex-col gap-1">
              <p className="text-xs text-gray-800 dark:text-gray-400 overflow-hidden">
                {i18n.language === "en"
                  ? item.en_details?.length > 30
                    ? `${item.en_details?.slice(0, 30)}...`
                    : item?.en_details
                  : item.details?.length > 30
                  ? `${item.details?.slice(0, 30)}...`
                  : item?.details}
              </p>
            </div>
          )}

          <div className="flex flex-col md:flex-row justify-start items-start md:justify-between py-2 md:items-center w-full">
            <div className="flex items-center justify-center gap-2 dark:text-white select-none">
              <IoRemoveCircleOutline
                className={`text-2xl md:text-3xl ${
                  item.quantity === 1
                    ? "text-[#0000004d] dark:text-[#9ca3af]"
                    : "text-main"
                } cursor-pointer selected-none`}
                onClick={remove}
              />
              <span>{item.quantity}</span>
              <IoAddCircleOutline
                className="text-2xl md:text-3xl text-main cursor-pointer"
                onClick={add}
              />
            </div>
            <div className="flex justify-end items-center w-full dark:text-white gap-2 text-xs font-semibold">
              <span className="line-through">
                {item.itemPrice} {t("singleProduct:currency")}
              </span>
              <span>{t("singleProduct:afterDiscount")}</span>
              <span className="">
                {item.purchasePrice} {t("singleProduct:currency")}
              </span>
            </div>
            {!done && (
              <FiX
                className={`w-5 absolute -top-2 h-5 p-0.5 rounded-full bg-red-600 text-gray-50 hover:bg-opacity-100 opacity-80 dark:bg-red-600 dark:text-gray-50 block transform hover:rotate-180 cursor-pointer transition duration-300 ease ${
                  i18n.language === "en" ? "-right-2" : "-left-2"
                }`}
                onClick={() => removeItem(item)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
