import { BASE_URL, BASE_URL_Img, options } from "../constatns";
import { useTranslation } from "react-i18next";
import { useGlobalContext } from "../context";
import { IoIosArrowBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { BsPerson, BsShop } from "react-icons/bs";
import { MdFamilyRestroom } from "react-icons/md";
import useDarkMode from "../hooks/useDarkMode";
import { toast } from "react-toastify";
import axios from "axios";

const InRestaurant = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { cartData, storeData, setCartData } = useGlobalContext();
  const errMessage = t("customerData:fieldRequired");

  useDarkMode();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();

  // const onSubmit = async (data) => {
  //   // Handle Message
  //   const total = cartData
  //     .reduce((acc, item) => acc + item.price, 0)
  //     .toLocaleString("en-US");
  //   const date = new Date(Date.now());
  //   let hours = date.getHours();
  //   let minutes = date.getMinutes();
  //   let ampm = hours >= 12 ? "مساءً" : "صباحاً";
  //   hours = hours % 12;
  //   hours = hours ? hours : 12; // the hour '0' should be '12'
  //   minutes = minutes < 10 ? "0" + minutes : minutes;
  //   const time = `${hours}:${minutes} ${ampm}`;

  //   const orderTotal = cartData.reduce((acc, item) => acc + item.price, 0);

  //   const message = `%0A%2A نوع الطلب %2A%3A داخل المطعم %0A%2A اسم العميل %2A%3A ${
  //     data?.name
  //   } %0A%2A رقم الطاولة %2A%3A ${
  //     data?.table_num
  //   } %0A%2A نوع الحجز %2A%3A ${
  //     data?.type_of_booking
  //   }%0A---------------------------%0A${cartData
  //     .map((item) => {
  //       let addons = "";
  //       if (item.addons && item.addons.length > 0) {
  //         addons = `%2A الإضافات %2A%3A %0A${item?.addons
  //           ?.map((e) => `%20 %20 • ${e.option_1}`)
  //           .join("%0A")} %0A`;
  //       }
  //       return `%2A الصنف %2A%3A ${item.name} %0A${
  //         item.size?.option
  //           ? `%2A الحجم %2A%3A ${item.size.option} %0A ${addons ? addons : ""}`
  //           : ""
  //       }%2A الكمية %2A%3A ${item.quantity} %0A%2A السعر %2A%3A ${
  //         item.price
  //       } ريال`;
  //     })
  //     .join(
  //       "%0A---------------------------%0A"
  //     )}%0A---------------------------%0A%2A مبلغ الطلب %2A%3A ${total} ريال %0A%2A المجموع %2A%3A ${orderTotal.toLocaleString(
  //     "en-US"
  //   )} ريال %0A%2A وقت الطلب %2A%3A ${time}`;

  //   console.log(data);

  //   window.open(
  //     `https://api.whatsapp.com/send?phone=${storeData.whatsapp}&text=${message}`
  //   );
  //   reset();
  //   toast.success("تم تأكيد الطلب بنجاح");
  //   navigate("/");
  //   setCartData([]);
  // };

  const onSubmit = async (data) => {
    const total = cartData.reduce((acc, item) => acc + item.price, 0);

    if (total < 1) toast.warning(t("toast:minimumCost"));
    else {
      const orderData = {
        customer: {
          name: data.name,
          phone: data.phone,
          address: data.address,
        },
        items: cartData,
        totalPrice: parseFloat(total),
        orderType: options.INRESTAURANT,
        tableNumber: data?.table_num,
        typeOfBooking: data.type_of_booking,
      };

      // if (searchParams.get("option") === options.TAKEAWAY)
      //   delete orderData.customer.address;
      // console.log("order_details", orderData);
      try {
        const response = await axios.post(`${BASE_URL}/order`, orderData, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log("response", response);
        localStorage.setItem("order_num", response.data?.data?._id);
        toast.success(t("toast:orderAccepted"));
        setCartData([]);
        reset();
        navigate(
          `/order-details/${response.data?.data?._id}?option=${options.INRESTAURANT}`
        );
      } catch (error) {
        console.log(error);
        toast.error(t("toast:error"));
      }
    }
  };
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
      <form
        className="w-full h-full flex flex-col justify-end gap-3 px-4 bg-white animateItems dark:bg-gray-700"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* table number */}
        <div className="flex flex-col">
          <label
            htmlFor="table_num"
            className={`relative block overflow-hidden border-b border-gray-200 bg-transparent pt-3 focus-within:border-main ${
              errors.table_num ? "border-red-500" : ""
            }`}
          >
            <select
              id="table_num"
              className={`w-full ${
                i18n.language === "en" ? "pl-5" : "pr-5"
              } outline-none dark:bg-gray-700 dark:text-white`}
              {...register("table_num", {
                valueAsNumber: true,
                validate: (val) => !isNaN(val) || errMessage,
              })}
              onChange={(e) =>
                setValue("table_num", e.target.value, { shouldValidate: true })
              }
              defaultValue="select"
            >
              <option value="select" disabled>
                {i18n.language === "en"
                  ? "Choose Your Table number"
                  : "اختر رقم الطاولة"}
              </option>

              {Array.from(Array(storeData?.tables).keys()).map((table, i) => (
                <option value={+table + 1} key={i} className="mr-8">
                  {table + 1}
                </option>
              ))}
            </select>
            <BsShop
              className={`absolute top-1/2 -translate-y-1/2 text-gray-400 text-lg peer-focus:text-main ${
                errors.table_num ? "text-red-500" : ""
              } ${i18n.language === "en" ? "left-0" : "right-0"}`}
            />
            <span className="absolute start-6 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 text-gray-400 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs dark:text-white">
              {t("customerData:table_num")}
            </span>
          </label>
          {errors.table_num ? (
            <span className="text-[10px] text-red-500">
              {errors.table_num.message}
            </span>
          ) : null}
        </div>
        {/* Name */}
        <div className="flex flex-col">
          <label
            htmlFor="name"
            className={`relative block overflow-hidden border-b border-gray-200 bg-transparent pt-3 focus-within:border-main ${
              errors.name ? "border-red-500" : ""
            }`}
          >
            <input
              type="text"
              id="name"
              {...register("name", {
                required: { value: true, message: errMessage },
              })}
              autoComplete="off"
              placeholder={t("customerData:name")}
              className="peer h-8 w-full border-none dark:text-white bg-transparent py-0 px-6 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
            />
            <BsPerson
              className={`absolute top-1/2 -translate-y-1/2 text-gray-400 text-lg peer-focus:text-main ${
                errors.name ? "text-red-500" : ""
              } ${i18n.language === "en" ? "left-0" : "right-0"}`}
            />
            <span className="absolute start-6 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 text-gray-400 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs dark:text-white">
              {t("customerData:name")}
            </span>
          </label>
          {errors.name ? (
            <span className="text-[10px] text-red-500">
              {errors.name.message}
            </span>
          ) : null}
        </div>

        {/* type of booking */}
        <div className="flex flex-col">
          <div className="flex items-center justify-center gap-8 py-4">
            {/* individuals */}
            <div>
              <input
                type="radio"
                className="hidden peer"
                id="individuals"
                value={t("customerData:individuals")}
                {...register("type_of_booking", {
                  required: {
                    value: true,
                    message: errMessage,
                  },
                })}
              />
              <label
                className={`peer-checked:border-main peer-checked:bg-main text-gray-700 peer-checked:text-white flex flex-col dark:text-white items-center justify-center gap-3 border p-2 w-28 h-28 rounded-full ${
                  errors.type_of_booking ? "border-red-500" : "border-gray-400"
                }`}
                htmlFor="individuals"
              >
                <BsPerson className="text-5xl" />
                <span className="text-sm">{t("customerData:individuals")}</span>
              </label>
            </div>
            {/* families */}
            <div>
              <input
                type="radio"
                className="hidden peer"
                id="families"
                value={t("customerData:families")}
                {...register("type_of_booking", {
                  required: {
                    value: true,
                    message: errMessage,
                  },
                })}
              />
              <label
                className={`peer-checked:border-main peer-checked:bg-main text-gray-700 peer-checked:text-white flex flex-col items-center justify-center gap-3 border w-28 h-28 p-2 rounded-full dark:text-white ${
                  errors.type_of_booking ? "border-red-500" : "border-gray-400"
                }`}
                htmlFor="families"
              >
                <MdFamilyRestroom className="text-5xl" />
                <span className="text-sm">{t("customerData:families")}</span>
              </label>
            </div>
          </div>
          {errors?.type_of_booking && (
            <small className="text-red-500 text-center">
              {errors.type_of_booking.message}
            </small>
          )}
        </div>

        <button
          className="bg-main font-semibold hover:bg-main transition text-white py-2 w-full rounded-full"
          type="submit"
        >
          {t("customerData:submitRequest")}
        </button>
      </form>
    </>
  );
};

export default InRestaurant;
