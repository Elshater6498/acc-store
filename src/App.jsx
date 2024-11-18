import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ReactGA from "react-ga4";

import useDarkMode from "./hooks/useDarkMode";
import { Loader } from "./components";
import { BASE_URL_Img } from "./constatns";
import { Home, Delivery, SingleItem, Cart, Options } from "./pages";
import { useGlobalContext } from "./context";

import "react-toastify/dist/ReactToastify.css";

ReactGA.send(document.location.pathname);

const App = () => {
  const [singleItem, setSingleItem] = useState({});
  const [value, setValue] = useState(0);

  const [isDarkMode] = useDarkMode();
  const { i18n } = useTranslation();
  const { storeData = {}, isLoading } = useGlobalContext();

  useEffect(() => {
    if (storeData) {
      document.documentElement.style.setProperty(
        "--primary-color",
        storeData.theme
      );
    }
  }, [storeData]);
  const cover = `${BASE_URL_Img + storeData?.cover?.replaceAll("\\", "/")}`;
  console.log(cover);
  return (
    <>
      <Router>
        <div className="flex hide-scrollbar font-fairuz">
          <div
            className="relative max-w-md md:ml-auto md:mr-0 mx-auto transition duration-100 dark:bg-gray-700 hide-scrollbar w-full"
            dir={i18n.language === "en" ? "ltr" : "rtl"}
          >
            <Routes>
              <Route
                path="/"
                element={
                  isLoading ? (
                    <Loader />
                  ) : (
                    <Home value={value} setValue={setValue} />
                  )
                }
              />
              <Route
                path="/:categoryName"
                element={<Home value={value} setValue={setValue} />}
              />
              <Route path="/delivery" element={<Delivery />} />
              <Route
                path="/cart"
                element={
                  <Cart singleItem={singleItem} setSingleItem={setSingleItem} />
                }
              />
              <Route
                path="/products/:productId"
                element={<SingleItem singleItem={singleItem} />}
              />
              <Route
                path="/offers/:offerId"
                element={<SingleItem singleItem={singleItem} />}
              />
              <Route path="/options" element={<Options />} />
            </Routes>
          </div>

          <div
            className="hidden md:block h-screen  w-[calc(100%-448px)] !bg-no-repeat !bg-cover fixed"
            style={{
              backgroundImage: `url(${cover || "/bg.png"})`,
            }}
          >
            <div className="bg-black/50 w-full h-full md:flex items-center justify-center">
              <div className="h-64 w-64 p-4 rounded-full bg-white flex items-center justify-center">
                {isLoading ? (
                  <Loader />
                ) : (
                  <img
                    src={
                      storeData?.image
                        ? BASE_URL_Img + storeData?.image
                        : "/logo.png"
                    }
                    alt={storeData?.name}
                    className="object-contain w-32 mx-auto"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </Router>
      <ToastContainer
        rtl={i18n.language === "ar"}
        position="bottom-center"
        autoClose={2000}
        closeOnClick={true}
        pauseOnFocusLoss={false}
        pauseOnHover
        draggable
        theme={isDarkMode ? "dark" : "light"}
      />
    </>
  );
};

export default App;
