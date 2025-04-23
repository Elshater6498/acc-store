import { useTranslation } from "react-i18next";
import { BASE_URL_Img } from "../constatns";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context";
import { FaCartPlus } from "react-icons/fa";

const Item = ({ item, displayOnly = false, onAddToCart }) => {
  const { t, i18n } = useTranslation();
  const { storeData } = useGlobalContext();

  const handleAddToCart = (e) => {
    if (onAddToCart && !displayOnly) {
      e.preventDefault(); // Prevent navigation to product detail
      e.stopPropagation(); // Stop event propagation
      onAddToCart(item, 1); // Pass the item and quantity 1
    }
  };

  return (
    <Link
      to={`/products/${item._id}`}
      dir={i18n.language === "en" ? "ltr" : "rtl"}
      className={`relative w-full h-28 rounded-lg grid grid-cols-12 gap-2 cursor-pointer bg-gray-100 dark:bg-gray-900 ${
        displayOnly ? "pointer-events-none" : ""
      }`}
    >
      {item.itemDiscount && item.itemDiscount > 0 && (
        <div
          className={`absolute -top-1 ${
            i18n.language === "en" ? "-right-1" : "-left-1"
          } bg-red-500 opacity-60 text-white text-xs font-bold px-2 py-1 rounded-md shadow-md transform -rotate-12 z-10`}
        >
          - {item.itemDiscount}%
        </div>
      )}
      <div className="relative w-full rounded-lg col-span-4 sm:col-span-3 flex items-center justify-center">
        <div>
          <img
            className="absolute inset-0 w-full h-full p-0.5 rounded-lg object-cover"
            src={
              item.images.length === 0
                ? "/logo.jpg"
                : displayOnly
                ? item.images[item.images.length - 1]?.path
                  ? BASE_URL_Img + item.images[item.images.length - 1]?.path
                  : storeData?.image
                  ? BASE_URL_Img + storeData?.image
                  : "/logo.jpg"
                : item.images[item.images.length - 1]?.path
                ? BASE_URL_Img + item.images[item.images.length - 1]?.path
                : storeData?.image
                ? BASE_URL_Img + storeData?.image
                : "/logo.jpg"
            }
            alt="item img"
          />
        </div>
      </div>
      <div className="w-full relative col-span-8 sm:col-span-9 px-1 flex flex-col justify-evenly">
        <h3 className="text-sm text-main font-semibold dark:text-white">
          {i18n.language === "en"
            ? item.enName && item.enName !== "undefined"
              ? item.enName?.length > 50
                ? `${item.enName?.slice(0, 50)}...`
                : item?.enName
              : ""
            : item.name && item.name !== "undefined"
            ? item.name?.length > 50
              ? `${item.name?.slice(0, 50)}...`
              : item?.name
            : ""}
        </h3>
        <p className="text-xs text-gray-800 dark:text-gray-400 overflow-hidden">
          {((i18n.language === "en" &&
            item.enDetails &&
            item.enDetails !== "undefined") ||
            (i18n.language !== "en" &&
              item.details &&
              item.details !== "undefined")) &&
            (i18n.language === "en"
              ? item.enDetails?.length > 70
                ? `${item.enDetails?.slice(0, 70)}...`
                : item?.enDetails
              : item.details?.length > 70
              ? `${item.details?.slice(0, 70)}...`
              : item?.details)}
        </p>

        <div className="flex justify-between items-center w-full">
          <FaCartPlus
            className="text-main dark:text-white cursor-pointer hover:scale-110 transition-transform"
            size={18}
            onClick={handleAddToCart}
          />
          <div className="flex items-center dark:text-white gap-2 text-xs font-semibold">
            <span className="line-through">
              {item.itemPrice} {t("singleProduct:currency")}
            </span>
            <span>{t("singleProduct:afterDiscount")}</span>
            <span className="">
              {item.purchasePrice} {t("singleProduct:currency")}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Item;
