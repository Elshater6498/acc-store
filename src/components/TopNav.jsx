import { Link } from "react-router-dom";
import { BASE_URL_Img } from "../constatns";
import { useTranslation } from "react-i18next";
import { useGlobalContext } from "../context";
import { BsWhatsapp } from "react-icons/bs";

export default function TopNav({ setSideNav }) {
  const { t, i18n } = useTranslation();
  const { storeData } = useGlobalContext();

  const changeLang = () => {
    i18n.changeLanguage(i18n.language === "ar" ? "en" : "ar");
    localStorage.setItem("lng", i18n.language);
  };
  return (
    <header className="z-30 transition bg-white duration-200 dark:bg-opacity-300 relative">
      <nav className="z-30 relative App-header absolutee left-0 right-0 text-white">
        <div className="z-50 w-full max-w-md mx-auto h-16 top-auto rounded-t-4xl py-1 flex items-center justify-between gap-3 dark:bg-gray-700 bg-opacity-50">
          <div className="flex justify-start items-center">
            <Link
              to="/"
              className={`overflow-y-hidden flex items-center cursor-pointer gap-2 ${
                i18n.language === "en" ? "pl-2" : "pr-2"
              }`}
            >
              <img
                src={
                  storeData?.image
                    ? BASE_URL_Img + storeData?.image
                    : "/logo.png"
                }
                alt={storeData?.name}
                className=" w-[56px] h-[57px]"
              />
              <h1
                className={`font-bold flex gap-1 flex-col text-base text-main dark:text-main/50 whitespace-nowrap`}
              >
                <span>{storeData?.name}</span>
                <span> {storeData?.enName}</span>
              </h1>
            </Link>
          </div>
          <div
            className={`flex justify-end items-center  ${
              i18n.language === "en" ? "mr-1" : "ml-1"
            }`}
          >
            <a
              className="relative flex justify-between items-center dark:bg-gray-600 dark:hover:bg-gray-500 py-2 px-2 rounded-full hover:bg-gray-200 transition bg-gray-100 bg-opacity-500 text-gray-800"
              href={`https://api.whatsapp.com/send/?phone=${
                storeData?.whatsapp
              }&text=${t("topNav:welcomeMessage")}`}
              target="_blank"
              rel="noreferrer"
            >
              <BsWhatsapp className="text-green-600 w-5 h-5" />
            </a>
            <button
              className="rounded-md text-main px-4 py-1 dark:text-white"
              onClick={changeLang}
            >
              {i18n.language === "ar" ? "EN" : "AR"}
            </button>
            <div
              className="w-10 h-10 p-2 rounded-full text-black transition duration-200 dark:text-gray-100 hover:bg-gray-400 hover:bg-opacity-50 flex justify-center items-center"
              onClick={() => setSideNav(true)}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="text-main dark:text-white"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  y="2"
                  width="20"
                  height="2.5"
                  rx="1.5"
                  fill="currentColor"
                />
                <rect
                  y="18"
                  width="20"
                  height="2.5"
                  rx="1.5"
                  fill="currentColor"
                />
                <rect
                  x="4"
                  y="10"
                  width="20"
                  height="2.5"
                  rx="1.5"
                  fill="currentColor"
                />
              </svg>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
