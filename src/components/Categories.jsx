import { useTranslation } from "react-i18next";

import { BASE_URL_Img } from "../constatns";
import { useLocation, useNavigate } from "react-router-dom";
import { useProductsByCategoryID } from "../lib/react-query/queriesAndMutations";

const Categories = ({ data, setValue }) => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // Filter out categories with no items
  const categoriesWithItems = data?.filter((category) => {
    // Get products for this category
    const { data: products } = useProductsByCategoryID(category._id);
    // Only include categories that have active products
    return products?.data?.some((product) => product.isActive === true);
  });

  if (!categoriesWithItems?.length) return null;

  return (
    <div className="p-2 flex gap-2 overflow-x-auto dark:bg-gray-700 whitespace-nowrap w-full z-[50] inset-0 bg-white shadow-[0_1px_2px_rgb(0,0,0,5%) hide-scrollbar">
      {categoriesWithItems?.map((item, i) => (
        <span
          className={`inline-flex items-center font-bold h-10 whitespace-nowrap justify-center rounded-full flex-row-reverse gap-2 text-sm px-6 py-1 dark:bg-gray-900 dark:text-white cursor-pointer ${
            pathname.slice(1) === item._id
              ? "text-white bg-main dark:bg-main"
              : "bg-gray-100"
          }`}
          onClick={() => {
            setValue(i);
            navigate(`/${item._id}`);
          }}
          key={i}
        >
          <span className="text-xs whitespace-nowrap font-semibold">
            {i18n.language === "en" ? item?.enName : item?.name}
          </span>
          <img
            src={`${item?.image ? BASE_URL_Img + item?.image : "/logo.png"}`}
            alt={`${i18n.language === "en" ? item?.enName : item?.name}`}
            width="24"
            height="24"
            className="z-10"
          />
        </span>
      ))}
    </div>
  );
};

export default Categories;
