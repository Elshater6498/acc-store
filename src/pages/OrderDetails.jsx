import { useTranslation } from "react-i18next";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { VscTarget } from "react-icons/vsc";
import { MdOutlineContentCopy } from "react-icons/md";
import { BsCheckCircleFill, BsX } from "react-icons/bs";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useState } from "react";

import { useGlobalContext } from "../context";
import { BASE_URL, BASE_URL_Img } from "../constatns";
import useDarkMode from "../hooks/useDarkMode";

const OrderDetails = () => {
  const [modalOn, setModalOn] = useState(false);

  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const { storeData } = useGlobalContext();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isDarkMode] = useDarkMode();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    navigate(`/track-order/${id}?option=${searchParams.get("option")}`);
  };

  const copy = () => {
    navigator.clipboard.writeText(id);
    toast.success(t("orderDetails:copied"), {
      position: "top-center",
      hideProgressBar: true,
    });
  };

  const handleClose = (e) => {
    if (e.target.id === "container") setModalOn(false);
  };

  // console.log(isDarkMode)

  return (
    <>
      <div className="w-full sticky z-[50] inset-0 bg-white max-w-md mx-auto h-16 top-auto shadow-[1px_1px_8px_#597c8066] py-1 flex items-center justify-between gap-2 dark:bg-gray-700">
        <div className="col-span-9 grid grid-cols-12 justify-start items-center">
          <Link
            to="/"
            className={`col-span-10 pr-4 text-md font-semibold text-gray-500 dark:text-white overflow-y-hidden flex items-center cursor-pointer gap-2  ${
              i18n.language === "en" ? "pl-4" : "pr-4"
            }`}
          >
            <img
              src={BASE_URL_Img + storeData?.image}
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
          onClick={() => navigate("/")}
        />
      </div>
      <div className="divide-y dark:text-white">
        <div className="flex flex-col items-center justify-center gap-4 py-6 px-4">
          <img
            src={isDarkMode ? "/img/welcome-dark.png" : "/img/verify.png"}
            alt="verify"
            className="w-80"
          />
          <div className="flex items-center justify-center ltr:flex-row-reverse gap-2">
            <BsCheckCircleFill className="text-3xl text-green-600" />
            <h2 className="text-xl font-bold">{t("orderDetails:success")}</h2>
          </div>
        </div>
        <div className="flex flex-col gap-4 p-4">
          <div className="flex justify-between items-center gap-4 py-4 flex-wrap">
            <div className="flex items-center gap-4">
              <h1 className="text-lg md:text-xl lg:text-2xl font-bold">
                {t("orderDetails:order_num")}: {id}
              </h1>
              <button
                type="button"
                onClick={copy}
                className="text-main text-xl"
              >
                <MdOutlineContentCopy />
              </button>
            </div>
            <button
              type="button"
              onClick={() => setModalOn(true)}
              className="flex items-center gap-2 py-1 px-3 rounded-lg bg-main text-white"
            >
              <VscTarget /> {t("orderDetails:track_order")}
            </button>
          </div>
        </div>
      </div>
      {modalOn ? (
        <div
          className="fixed z-[105] inset-0 flex items-center justify-center bg-black/50 px-4"
          id="container"
          onClick={handleClose}
        >
          <div className="max-w-2xl mx-auto max-h-[90vh] overflow-y-auto w-full bg-white dark:bg-gray-700 dark:text-white rounded-2xl no-scrollbar">
            <div className="flex items-center justify-between w-full mb-2 sticky top-0 bg-white dark:bg-gray-700 p-4 shadow-md">
              <h3 className="text-lg md:text-xl font-bold">
                {t("modal:title")}
              </h3>
              <button onClick={() => setModalOn(false)}>
                <BsX className="bg-red-500 text-white p-1 rounded-full text-3xl" />
              </button>
            </div>
            <form
              className="flex flex-col w-full gap-2 px-4 mt-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex flex-col gap-1">
                <label htmlFor="orderId">{t("modal:label")}</label>
                <input
                  type="text"
                  id="orderId"
                  {...register("orderId", {
                    required: {
                      value: true,
                      message: t("customerData:fieldRequired"),
                    },
                  })}
                  defaultValue={id}
                  className={`w-full border py-2 px-4 outline-none rounded-lg dark:bg-gray-700 ${
                    errors.orderId ? "border-red-500" : "border-gray-400"
                  }`}
                />
                {errors.orderId ? (
                  <span className="text-red-500 text-xs">
                    {errors.orderId.message}
                  </span>
                ) : null}
              </div>
              <div className="flex items-center justify-end gap-4">
                <button
                  type="submit"
                  className="bg-main text-white transition py-2 my-6 px-8 rounded-lg"
                >
                  {t("modal:send")}
                </button>
                <button
                  type="button"
                  onClick={() => setModalOn(false)}
                  className="bg-gray-300 hover:bg-gray-400 transition py-2 my-6 px-8 rounded-lg dark:bg-gray-900"
                >
                  {t("modal:cencel")}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default OrderDetails;
