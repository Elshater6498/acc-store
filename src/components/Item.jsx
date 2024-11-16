import { useTranslation } from "react-i18next";
import { BASE_URL_Img } from "../constatns";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context";

const Item = ({ item, displayOnly = false }) => {
  const { t, i18n } = useTranslation();
  const { storeData } = useGlobalContext();

  console.log("====================================");
  console.log(item);
  console.log("====================================");

  return (
    <Link
      to={`/products/${item._id}`}
      dir={i18n.language === "en" ? "ltr" : "rtl"}
      className={`w-full h-28 rounded-lg grid grid-cols-12 gap-2 cursor-pointer bg-gray-100 dark:bg-gray-900 ${
        displayOnly ? "pointer-events-none" : ""
      }`}
    >
      <div className="relative w-full rounded-lg col-span-4 sm:col-span-3 flex items-center justify-center">
        <img
          className="absolute inset-0 w-full h-full p-0.5 object-cover rounded-lg"
          src={
            displayOnly
              ? item.image || storeData?.image
                ? BASE_URL_Img + storeData?.image
                : "/logo.png"
              : BASE_URL_Img + item.image || storeData?.image
              ? BASE_URL_Img + item?.image
              : "/logo.png"
          }
          alt="item img"
        />
      </div>
      <div className="w-full relative col-span-8 sm:col-span-9 space-y-1 sm:space-y-2 px-2 flex flex-col justify-between">
        <h3 className="mt-2 text-sm text-main font-semibold  dark:text-white">
          {i18n.language === "en" ? item.enName : item.name}
        </h3>
        <p className="text-xs text-gray-800 dark:text-gray-400 overflow-hidden">
          {i18n.language === "en"
            ? item.enDetails?.length > 50
              ? `${item.enDetails?.slice(0, 50)}...`
              : item?.enDetails
            : item.details?.length > 50
            ? `${item.details?.slice(0, 50)}...`
            : item?.details}
        </p>
        <div className="flex justify-between py-2 items-center w-full">
          {item?.itemPrice ? (
            <p className="text-sm dark:text-white">
              {item.itemPrice}
              <span className="text-main text-xs font-semibold">
                {t("singleProduct:currency")}
              </span>
            </p>
          ) : null}
          <span className="text-sm flex items-center font-semibold mr-auto ltr:ml-auto ltr:mr-0 dark:text-white">
            {item.options?.length
              ? item.options[0].sellingPrice
              : item.sellingPrice}
            <span className="text-main dark:text-white text-xs font-semibold mx-0.5">
              {t("singleProduct:currency")}
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
};

export default Item;
