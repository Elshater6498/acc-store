import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";
import { IoMdAddCircle, IoIosArrowBack } from "react-icons/io";
import useDarkMode from "../hooks/useDarkMode";
import { useGlobalContext } from "../context";
import { BASE_URL_Img } from "../constatns";
import { Loader } from "../components";
import { useOffer, useProduct } from "../lib/react-query/queriesAndMutations";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../index.css";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const SingleItem = () => {
  const { productId, offerId } = useParams();
  const isOffer = !!offerId;
  const { data, isPending: isLoading } = isOffer
    ? useOffer(offerId)
    : useProduct(productId);
  const [quantity, setQuantity] = useState(1);
  const { cartData, setCartData, storeData } = useGlobalContext();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  useDarkMode();

  const add = () => setQuantity((prev) => prev + 1);
  const remove = () => {
    if (quantity === 1) return;
    setQuantity((prev) => prev - 1);
  };

  const addToCart = () => {
    const itemData = data?.data;
    const newCartItem = {
      id: itemData?._id,
      name: itemData?.name,
      en_name: itemData?.enName,
      images: isOffer ? itemData?.image : itemData?.images,
      details: itemData?.details,
      en_details: itemData?.enDetails,
      quantity,
      itemPrice: itemData?.itemPrice?.toFixed(2) * quantity,
      itemDiscount: itemData?.itemDiscount,
      purchasePrice: itemData?.purchasePrice?.toFixed(2) * quantity,
      sellingPrice: itemData?.sellingPrice?.toFixed(2) * quantity,
      profitMargin: itemData?.profitMargin?.toFixed(2) * quantity,
    };

    const existingItemIndex = cartData.findIndex(
      (item) => item.id === newCartItem.id && item.name === newCartItem.name
    );
    if (existingItemIndex !== -1) {
      cartData[existingItemIndex].quantity += newCartItem.quantity;
      cartData[existingItemIndex].sellingPrice += newCartItem.sellingPrice;
      cartData[existingItemIndex].purchasePrice += newCartItem.purchasePrice;
      cartData[existingItemIndex].profitMargin += newCartItem.profitMargin;
      setCartData([...cartData]);
    } else {
      setCartData([...cartData, newCartItem]);
    }
    setQuantity(1);
    navigate(-1);
  };

  return (
    <div
      dir={i18n.language === "en" ? "ltr" : "rtl"}
      className="fixed overflow-y-auto inset-x-0 max-w-md md:ml-auto md:mr-0 mx-auto h-full bg-white overflow-x-hidden w-full z-[401] fastAnimate dark:bg-gray-700"
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
              className=" w-[56px] h-[57px]"
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
      {isLoading ? (
        <Loader />
      ) : (
        <div className="p-4 rounded-lg bg-white dark:bg-gray-700 flex flex-col w-full pt-16">
          <div className="flex flex-col justify-center text-center gap-4 mb-12 mt-5 dark:text-white">
            {isOffer ? (
              <div className="w-full h-full">
                <img
                  src={BASE_URL_Img + data?.data?.image}
                  alt={
                    i18n.language === "en"
                      ? data?.data?.enName
                      : data?.data?.name
                  }
                  className="w-full h-full object-scale-down rounded-lg dark:bg-white"
                />
              </div>
            ) : (
              <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                pagination={{
                  clickable: true,
                }}
                loop={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper !rounded-lg"
              >
                {data?.data?.images
                  ?.slice()
                  .reverse()
                  .map((img, index) => (
                    <SwiperSlide key={index} className="">
                      <img
                        src={BASE_URL_Img + img.path}
                        alt={
                          i18n.language === "en"
                            ? data?.data?.enName
                            : data?.data?.name
                        }
                        className="h-full w-full object-contain"
                      />
                    </SwiperSlide>
                  ))}
              </Swiper>
            )}
            <h2 className="text-2xl text-main dark:text-white">
              {i18n.language === "en" ? data?.data?.enName : data?.data?.name}
            </h2>
            <div className="flex gap-2 py-1 px-3 text-xs w-fit mx-auto rounded-full text-white bg-main">
              {data?.data?.sellingPrice ? (
                <span>
                  {data?.data?.sellingPrice} {t("singleProduct:currency")}
                </span>
              ) : null}
              {t("singleProduct:insteadOf")}
              {data?.data?.itemPrice ? (
                <span>
                  {data?.data?.itemPrice} {t("singleProduct:currency")}
                </span>
              ) : null}
            </div>
            <p className="text-gray-700 dark:text-gray-200 text-base">
              {i18n.language === "en"
                ? data?.data?.enDetails
                : data?.data?.details}
            </p>
            <div className="flex flex-col gap-2">
              <h4 className="text-lg text-main bg-[#f3f4f6] py-1 rounded-full w-full text-center dark:bg-gray-900 dark:text-white">
                {t("singleProduct:quantity")}
              </h4>
              <div className="flex items-center justify-center gap-4 select-none">
                <IoRemoveCircleOutline
                  className={`text-4xl ${
                    quantity === 1
                      ? "text-[#0000004d] dark:text-[#9ca3af]"
                      : "text-main"
                  } cursor-pointer selected-none`}
                  onClick={remove}
                />
                <span className="text-xl">{quantity}</span>
                <IoAddCircleOutline
                  className="text-4xl text-main cursor-pointer"
                  onClick={add}
                />
              </div>
            </div>
          </div>
          <button
            className="font-semibold flex items-center justify-center bg-main text-white rounded-full gap-2 border-2 border-main py-2 px-4 w-full "
            onClick={addToCart}
          >
            <span className="flex items-center gap-2">
              <IoMdAddCircle className="text-2xl text-white" /> {t("cart:add")}
            </span>
            {data ? (
              <span className="text-md font-semibold whitespace-nowrap">
                {data?.data?.sellingPrice * quantity}{" "}
                {t("singleProduct:currency")}
              </span>
            ) : null}
          </button>
        </div>
      )}
    </div>
  );
};

export default SingleItem;
