import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useGlobalContext } from "../context";
import {
  Loader,
  TopNav,
  SearchBar,
  Categories,
  SearchLabel,
  BottomBar,
  SideNav,
  Item,
} from "../components";
import {
  useCategories,
  useOffers,
  useProductsByCategoryID,
  useProductsSearch,
} from "../lib/react-query/queriesAndMutations";
import { useParams } from "react-router-dom";
import OffersSlider from "../components/OffersSlider";

const Home = ({ value, setValue }) => {
  const inputRef = useRef();
  const { categoryID } = useParams();

  const [sideNav, setSideNav] = useState(false);
  // const [filteredItems, setFilteredItems] = useState([])
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [searchValue, setSearchValue] = useState(inputRef.current?.value || "");
  const [searchQuery, setSearchQuery] = useState("");
  const { data: filteredItems } = useProductsSearch(searchValue);
  const { t } = useTranslation();
  const { storeData } = useGlobalContext();
  const { data: categories } = useCategories();
  const { data: offers } = useOffers();
  const { data: products, isPending: isLoading } = useProductsByCategoryID(
    categoryID || categories?.data[value]?._id
  );

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(e.target[0].value);

    if (e.target[0].value.length > 0) {
      setIsSubmitted(true);
      setSearchValue(e.target[0].value);

      // setFilteredItems(products?.data)
      e.target[0].blur();
    }
    e.target[0].blur();
    document.documentElement.scrollTop = 0;
    // setSearchValue('')
  };

  const close = () => {
    setIsSubmitted(false);
    setSearchValue("");
    setSearchQuery("");
  };

  return (
    <div className="hide-scrollbar">
      <div className="sticky top-0 z-20">
        <TopNav setSideNav={setSideNav} storeData={storeData} />
        <SearchBar
          handleSearch={handleSearch}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </div>
      {offers?.data?.some((offer) => offer.isActive) ? (
        <OffersSlider offers={offers?.data} />
      ) : null}
      <div className="sticky top-[125px] z-50">
        {categories?.data?.length ? (
          <Categories
            data={categories?.data}
            value={value}
            setValue={setValue}
          />
        ) : null}
      </div>
      {isSubmitted && (
        <SearchLabel
          filteredItems={filteredItems?.data}
          searchValue={searchValue}
          close={close}
        />
      )}
      <BottomBar />
      <SideNav
        sideNav={sideNav}
        setSideNav={setSideNav}
        storeData={storeData}
      />
      <div className="w-full px-4 pb-4 mb-10 pt-2 flex flex-col gap-2 items-center bg-white dark:bg-gray-700">
        {isLoading ? (
          <Loader />
        ) : isSubmitted ? (
          filteredItems?.data?.length === 0 ? (
            <div className="w-full flex items-center font-semibold gap-4 justify-center flex-col my-5 dark:text-white">
              <img
                src="/img/delete.png"
                alt="not-found"
                width="100em"
                height="100em"
              />
              <h2 className="text-3xl text-center text-[#597c80] dark:text-white">
                {t("search:noResults")}
              </h2>
            </div>
          ) : (
            filteredItems?.data
              ?.filter((product) => product.isActive === true)
              .map((item, i) => <Item item={item} key={i} />)
          )
        ) : products?.data?.length ? (
          products?.data
            ?.filter((product) => product.isActive === true)
            .map((item, i) => <Item item={item} key={i} />)
        ) : (
          <div className="w-full flex items-center font-semibold gap-4 justify-center flex-col my-16 dark:text-white">
            <img
              src="/img/delete.png"
              alt="not-found"
              width="100em"
              height="100em"
            />
            <h2 className="text-3xl text-center text-[#597c80] dark:text-white">
              {t("search:noResults")}
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
