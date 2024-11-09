import useDarkMode from "../hooks/useDarkMode";
import {
  BsGeoAlt,
  BsShare,
  BsMoon,
  BsSun,
  BsX,
  BsWhatsapp,
  BsPhone,
  BsInstagram,
  BsFacebook,
  BsTiktok,
  BsTwitter,
  BsSnapchat,
  BsTelegram,
} from "react-icons/bs";
import { toast } from "react-toastify";
import { BASE_URL_Img } from "../constatns";
import { useGlobalContext } from "../context";
import { useTranslation } from "react-i18next";

const SideNav = ({ sideNav, setSideNav }) => {
  const [isDarkMode, toggleDarkMode] = useDarkMode();
  const { storeData } = useGlobalContext();
  const { t, i18n } = useTranslation(["sideNav"]);

  const sideNavData = [
    {
      id: 1,
      text: t("facebook"),
      icon: BsFacebook,
      href: storeData?.socialMedia?.facebook,
    },
    {
      id: 2,
      text: t("instagram"),
      icon: BsInstagram,
      href: storeData?.socialMedia?.instagram,
    },
    {
      id: 3,
      text: t("twitter"),
      icon: BsTwitter,
      href: storeData?.socialMedia?.x,
    },
    {
      id: 4,
      text: t("tiktok"),
      icon: BsTiktok,
      href: storeData?.socialMedia?.tiktok,
    },
    {
      id: 5,
      text: t("snapchat"),
      icon: BsSnapchat,
      href: storeData?.socialMedia?.snapchat,
    },
    // {
    //   id: 6,
    //   text: t("whatsapp"),
    //   icon: BsWhatsapp,
    //   href: `https://api.whatsapp.com/send/?phone=${storeData?.whatsapp}`,
    // },
    {
      id: 7,
      text: t("callUs"),
      icon: BsPhone,
      href: `tel:${storeData?.phone}`,
    },
    {
      id: 8,
      text: t("telegram"),
      icon: BsTelegram,
      href: storeData?.socialMedia?.telegram,
    },
  ];

  const share = () => {
    if (navigator.share) {
      navigator
        .share({
          title: storeData?.name,
          url: storeData?.url,
        })
        .then(() => {
          toast.success(t("thanksForSharing"));
        })
        .catch(() => toast.error(t("shareFaild")));
    } else {
      toast.error(t("shareFaild"));
    }
  };

  const toggleTheme = () => {
    if (isDarkMode) {
      return (
        <div
          onClick={() => toggleDarkMode()}
          className={`relative flex justify-between dark:bg-gray-600 dark:hover:bg-gray-500 items-center py-3 px-4 rounded-br-md rounded-bl-md transition bg-gray-100 bg-opacity-500 text-gray-800 cursor-pointer `}
        >
          <p className="text-xs md:text-md text-gray-900 font-semibold dark:text-white dark:text-white">
            {t("lightTheme")}
          </p>
          <BsSun className="w-5 h-5 text-main" />
        </div>
      );
    } else {
      return (
        <div
          onClick={() => toggleDarkMode()}
          className={`relative flex justify-between items-center py-2.5 px-4 rounded-sm hover:bg-gray-200 transition bg-gray-100 bg-opacity-500 hover:bg-gray-200 text-gray-800 `}
        >
          <p className="text-xs md:text-md text-gray-900 font-semibold dark:text-white">
            {t("darkTheme")}
          </p>
          <BsMoon className="w-5 h-5 text-main" />
        </div>
      );
    }
  };

  return (
    <div className="relative inset-0 flex justify-center z-[102]">
      <div
        className={`fixed inset-0 bg-black dark:bg-white bg-opacity-70 dark:bg-opacity-70 ${
          sideNav ? "block" : "hidden"
        }`}
        onClick={() => setSideNav(false)}
      ></div>
      <div
        className={`fixed w-[350px] md:w-[447px] top-0 right-0 bg-white flex flex-col dark:bg-gray-700 h-full transition-all duration-500 ease-out rounded-tl-3xl rounded-bl-3xl overflow-hidden  ${
          sideNav
            ? "left-[calc(100%-350px)] md:left-[calc(100%-447px)]"
            : "left-[100vw]"
        }`}
      >
        <BsX
          className={`eax absolute left-1.5 top-1.5 z-103 w-5 h-5 p-0.5 mx-2 rounded-full bg-gray-700 text-gray-50 hover:bg-gray-400 dark:bg-red-500 hover:bg-opacity-50 transform hover:rotate-180 dark:bg-gray-700 dark:text-gray-50 ${
            sideNav ? "block" : "hidden"
          }`}
          onClick={() => setSideNav(false)}
        />
        <div
          className={`bg-white w-full dark:bg-gray-700 flex items-center justify-center py-4`}
        >
          <img
            src={
              storeData?.image ? BASE_URL_Img + storeData?.image : "/logo.png"
            }
            alt={storeData?.name}
            className="w-[100px] h-[100px]"
          />
        </div>
        <div className="flex flex-col w-full overflow-hidden px-2 mt-2 gap-0.5">
          <p className="py-2.5 px-4 rounded-tr-md dark:text-white text-center rounded-tl-md bg-primaryGreen-200 bg-opacity-500 text-xs leading-normal text-gray-900 font-semibold">
            {t("info")}
          </p>
          {sideNavData.map((link) => {
            return !link.href || link.href === "null" ? null : (
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className={`relative flex justify-between items-center dark:bg-gray-600 dark:hover:bg-gray-500 py-2.5 px-4 rounded-sm hover:bg-gray-200 transition bg-gray-100 bg-opacity-500 text-gray-800`}
                key={link.id}
              >
                <p className="text-xs md:text-md text-gray-900 font-semibold dark:text-white">
                  {link.text}
                </p>
                <link.icon className="text-main w-5 h-5" />
              </a>
            );
          })}
          <button
            onClick={(e) => share(e)}
            className={`relative flex justify-between items-center dark:bg-gray-600 dark:hover:bg-gray-500 py-2.5 px-4 rounded-sm hover:bg-gray-200 transition bg-gray-100 bg-opacity-500 text-gray-800`}
          >
            <p className="text-xs md:text-md text-gray-900 font-semibold dark:text-white">
              {t("share")}
            </p>
            <BsShare className="text-main w-5 h-5" />
          </button>
          <a
            href="https://maps.app.goo.gl/5z12zuprSBpDSkY79"
            target="_blank"
            rel="noreferrer"
            className={`relative flex justify-between items-center dark:bg-gray-600 dark:hover:bg-gray-500 py-2.5 px-4 rounded-sm hover:bg-gray-200 transition bg-gray-100 bg-opacity-500 shadow-sm text-gray-800`}
          >
            <p className="text-xs md:text-md text-gray-900 font-semibold dark:text-white">
              {i18n.language === "en"
                ? storeData?.enAddress
                : storeData?.address}
            </p>
            <BsGeoAlt className="text-main w-5 h-5" />
          </a>
          {/* <button
            className={`relative flex justify-between items-center dark:bg-gray-600 dark:hover:bg-gray-500 py-2.5 px-4 rounded-sm hover:bg-gray-200 transition bg-gray-100 bg-opacity-500 text-gray-800`}
          >
            <p className='text-xs md:text-md text-gray-900 font-semibold dark:text-white'>
              {t('businessHours')}: {t('from')}{' '}
              <span className='text-main'>
                {moment(storeData?.opened_from, 'HH:mm').format('hh:mm')}
              </span>{' '}
              {opened_from_time} {t('to')}{' '}
              <span className='text-main'>
                {moment(storeData?.opened_to, 'HH:mm').format('hh:mm')}
              </span>{' '}
              {opened_to_time}
            </p>
            <BsClock className='text-main w-5 h-5' />
          </button> */}
          {toggleTheme()}
        </div>
        <span className="text-xs mt-auto py-4 text-center dark:text-gray-300">
          حقوق النشر &copy; {`${new Date().getFullYear()}`}{" "}
          <a
            href="https://alef-team-three.vercel.app"
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-main"
          >
            ألِف
          </a>{" "}
          جميع الحقوق محفوظة.
        </span>
      </div>
    </div>
  );
};

export default SideNav;
