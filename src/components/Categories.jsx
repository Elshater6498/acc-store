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
    <div className="p-2 flex gap-3 overflow-x-auto dark:bg-gray-700 whitespace-nowrap w-full z-[50] inset-0 bg-white shadow-[0_1px_2px_rgb(0,0,0,5%) hide-scrollbar">
      {categoriesWithItems?.filter((cat) => cat.isActive === true)?.map((cat, i) => (
        <div
          className={`flex flex-col items-center justify-center gap-2`}
          onClick={() => {
            setValue(i);
            navigate(`/${cat._id}`)
          }}
          key={i}
        >
          <div
            className={`h-16 w-16 dark:bg-white  cursor-pointer rounded-full ${
              pathname.slice(1) === cat._id
                ? "border-2 border-main dark:border-main"
                : "bg-gray-100"
            }`}
          >
            <img
              src={`${cat?.image ? BASE_URL_Img + cat?.image : "/logo.png"}`}
              alt={`${i18n.language === "en" ? cat?.enName : cat?.name}`}
              className="w-full h-full object-scale-down rounded-full"
            />
          </div>
          <p
            className={`font-semibold whitespace-nowrap  text-sm dark:bg-gray-900 dark:text-white cursor-pointer py-1 px-2 rounded-full ${
              pathname.slice(1) === cat._id
                ? "text-white bg-main dark:bg-main"
                : "bg-gray-100"
            }`}
          >
            {i18n.language === "en" ? cat?.enName : cat?.name}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Categories;
