import { useTranslation } from 'react-i18next'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { IoIosArrowBack } from 'react-icons/io'
import useSWR from 'swr'
import moment from 'moment'

import { Item } from '../components'
import { useGlobalContext } from '../context'
import { BASE_URL, BASE_URL_Img, FETCHER, options } from '../constatns'

const TrackOrder = () => {
  const { orderId } = useParams()
  const { storeData } = useGlobalContext()
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const option = searchParams.get('option')

  const { data } = useSWR(`${BASE_URL}/order/${orderId}`, FETCHER)

  const orderStatus = {
    PENDING: {
      AR: 'جاري مراجعة طلبك',
      EN: 'Your Order is being reviewed',
    },
    DONE: {
      AR: 'تم قبول الطلب وجاري التجهيز',
      EN: 'Order accepted and processing is in progress',
    },
    FAILED: {
      AR: 'تم رفض طلبك',
      EN: 'Order has been rejected',
    },
  }

  const orderDelivery = {
    IN_RESTAURANT: {
      AR: 'داخل المطعم',
      EN: 'in restaurant',
    },
    STORE: {
      AR: 'استلام من الفرع',
      EN: 'receive from the branch',
    },
  }

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
      {/* Order Details */}
      {data?.status ? (
        <>
          <div className="divide-y pt-4 dark:text-white">
            <div className="flex flex-col gap-4 p-4">
              <div className="flex items-center gap-2 py-4">
                <p className="md:text-lg lg:text-xl font-bold">
                  {t("trackOrder:status")}:
                </p>
                <h2 className="text-main text-xl md:text-2xl font-bold">
                  {data?.status === "pending"
                    ? i18n.language === "en"
                      ? orderStatus.PENDING.EN
                      : orderStatus.PENDING.AR
                    : data?.status === "accepted"
                    ? i18n.language === "en"
                      ? orderStatus.DONE.EN
                      : orderStatus.DONE.AR
                    : i18n.language === "rejected"
                    ? orderStatus.FAILED.EN
                    : orderStatus.FAILED.AR}
                </h2>
              </div>
              <div className="flex items-center justify-between flex-wrap gap-2 w-full">
                <div className="text-gray-600 text-sm dark:text-white">
                  {t("trackOrder:order_time")}:{" "}
                  <span className="font-bold text-gray-700 text-base dark:text-gray-300">
                    {moment(data?.created_at).format("LT")}
                  </span>
                </div>
              </div>
            </div>
            <div className="p-4 flex flex-col md:flex-row gap-4">
              <div className="flex flex-col gap-3 flex-1">
                <h4 className="text-xl font-bold">
                  {t("trackOrder:client_name")}
                </h4>
                <p className="text-main">{data?.customer?.name}</p>
              </div>
              {option !== options.INRESTAURANT && (
                <div className="flex flex-col gap-3 flex-1">
                  <h4 className="text-xl font-bold">
                    {t("trackOrder:payment")}
                  </h4>
                  <p className="text-gray-700 dark:text-white">
                    {t("trackOrder:payment_when_recieving")}
                  </p>
                </div>
              )}
              <div className="flex flex-col gap-3 flex-1">
                <h4 className="text-xl font-bold">
                  {t("trackOrder:recieving_method")}
                </h4>
                <div className="flex flex-col gap-2">
                  <p className="text-main font-semibold">
                    {option === options.INRESTAURANT
                      ? i18n.language === "en"
                        ? orderDelivery.IN_RESTAURANT.EN
                        : orderDelivery.IN_RESTAURANT.AR
                      : i18n.language === "en"
                      ? orderDelivery.STORE.EN
                      : orderDelivery.STORE.AR}
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full p-4 flex flex-col gap-4">
              <h3 className="text-lg md:text-xl font-semibold">
                {t("trackOrder:order_details")}
              </h3>
              <div className="flex flex-col gap-4">
                {data?.items &&
                  data?.items.map((item, i) => (
                    <Item item={item} key={i} displayOnly={true} />
                  ))}
              </div>
              <div className="flex items-center gap-2">
                <p className="dark:text-white text-lg font-semibold">
                  {t("cart:total")}
                </p>
                <div className="flex items-center font-semibold gap-2 dark:text-white">
                  <span className="text-main dark:text-white text-2xl font-semibold">
                    {data?.totalPrice}
                  </span>
                  {t("singleProduct:currency")}
                </div>
              </div>
            </div>
          </div>
          <Link
            to="/"
            className="text-white mb-6 mx-auto w-fit block mt-8 bg-main py-2 px-6 rounded-full text-center"
          >
            {t("trackOrder:home_page")}
          </Link>
        </>
      ) : (
        <div className="flex items-center justify-center py-20 flex-col gap-8">
          <h2 className="text-main text-center text-xl md:text-2xl lg:text-3xl font-bold">
            {t("trackOrder:no_order")}
          </h2>
          <Link
            to="/"
            className="text-white bg-main py-2 px-6 rounded-full text-center"
          >
            {t("trackOrder:home_page")}
          </Link>
        </div>
      )}
    </>
  );
}

export default TrackOrder
