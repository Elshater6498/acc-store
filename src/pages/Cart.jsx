import { useTranslation } from "react-i18next";
import { IoIosArrowBack } from "react-icons/io";
import { IoArrowBackCircle } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import useDarkMode from "../hooks/useDarkMode";
import { useGlobalContext } from "../context";
import { CartItem } from "../components";
import { BASE_URL_Img } from "../constatns";

const CartPage = () => {
  useDarkMode();
  const navigate = useNavigate();
  const { cartData, storeData } = useGlobalContext();
  const { t, i18n } = useTranslation();

  return (
    <div
      dir={i18n.language === "en" ? "ltr" : "rtl"}
      className="fixed overflow-y-auto inset-x-0 max-w-md md:ml-auto dark:bg-gray-700 md:mr-0 mx-auto h-full bg-white overflow-x-hidden w-full z-[401] fastAnimate"
    >
      <div className="z-50 fixed w-full bg-white max-w-md mx-auto h-16 top-auto shadow-[1px_1px_8px_#597c8066] py-1 flex items-center justify-between gap-2 dark:bg-gray-700">
        <div className="col-span-9 grid grid-cols-12 justify-start items-center">
          <Link
            to="/"
            className={`col-span-10 pr-4 text-md font-semibold text-gray-500 dark:text-white overflow-y-hidden flex items-center cursor-pointer gap-2  ${
              i18n.language === "en" ? "pl-4" : "pr-4"
            }`}
          >
            <img
              src={
                storeData?.image ? BASE_URL_Img + storeData?.image : "/logo.png"
              }
              alt={storeData?.name}
              className="w-[56px] h-[57px]"
            />
            <h1 className="font-extrabold flex gap-1 flex-col text-md text-main dark:text-main/50">
              <span className="inline-block transform translate-y-1 mx-0.5 text-brown-400">
                {storeData?.name}
              </span>
              <span className="font-extrabold text-md text-main dark:text-main/50 overflow-hidden">
                {" "}
                {storeData?.enName}
              </span>
            </h1>
          </Link>
        </div>
        <IoIosArrowBack
          className={`w-10 h-10 rounded-full text-main hover:bg-main hover:text-white dark:text-white transition p-2 cursor-pointer ${
            i18n.language === "en" ? "mr-4 rotate-180" : "ml-4"
          }`}
          title="رجوع"
          onClick={() => navigate(-1)}
        />
      </div>
      <div className="w-full pt-20 px-4 flex flex-col gap-4 items-center justify-end bg-white dark:bg-gray-700">
        {cartData.length > 0 ? (
          cartData.map((item, i) => <CartItem key={i} item={item} />)
        ) : (
          <div className="w-full flex items-center font-semibold gap-4 justify-center flex-col my-20 dark:text-white">
            <img
              src="/img/add-to-basket.png"
              alt="add to basket icon"
              width="100em"
              height="100em"
            />
            <h2 className="text-3xl text-center text-main dark:text-white">
              {t("cart:emptyCart")}
            </h2>
            <button
              onClick={() => navigate(-1)}
              className={`font-semibold flex items-center justify-center text-main gap-2 border-2 border-main rounded-full py-2 px-4 w-full dark:bg-gray-900 dark:text-white dark:border-[#111827] ${
                i18n.language === "en" ? "flex-row-reverse" : ""
              }`}
            >
              <IoArrowBackCircle className="text-2xl icon-flip" />{" "}
              {t("cart:back")}
            </button>
          </div>
        )}
      </div>
      {cartData.length > 0 ? (
        <div className="flex flex-col gap-4 my-6 justify-start px-4">
          <div className="flex items-center justify-between foa9l">
            <p className="border-main text-main dark:text-white text-lg font-semibold">
              {t("cart:total")}
            </p>
            <div className="flex items-center gap-2 dark:text-white">
              <div className="flex items-center font-semibold gap-1 line-through">
                <span className="text-main dark:text-white text-lg font-semibold">
                  {cartData.reduce((acc, item) => acc + item.itemPrice, 0)}
                </span>
                {t("singleProduct:currency")}
              </div>
              {t("singleProduct:afterDiscount")}
              <div className="flex items-center font-semibold gap-1">
                <span className="text-main dark:text-white text-lg font-semibold">
                  {cartData.reduce((acc, item) => acc + item.purchasePrice, 0)}
                </span>
                {t("singleProduct:currency")}
              </div>
            </div>
          </div>
          <div className="font-semibold flex flex-col gap-4">
            <button
              onClick={() => navigate("/options")}
              className="py-2 w-full rounded-full bg-main text-white text-center"
            >
              {t("cart:next")}
            </button>
            <button
              onClick={() => navigate(-1)}
              className="font-semibold flex items-center justify-center text-gray-900 bg-main80 gap-2 rounded-full py-2 px-4 w-full bg-gray-200 dark:bg-gray-900 dark:text-white dark:border-[#111827]"
            >
              {t("cart:back")}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default CartPage;
