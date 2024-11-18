import { BASE_URL_Img } from "../constatns";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../index.css";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const OffersSlider = ({ offers }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        loop={true}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper !h-60 rounded-lg my-2 !max-w-[27rem]"
      >
        {offers
          .filter((offer) => offer.isActive === true)
          .sort((a, b) => a.id - b.id)
          .map((offer, i) => (
            <SwiperSlide
              className=""
              key={i}
              onClick={() => navigate(`/offers/${offer._id}`)}
            >
              <div className="absolute bottom-2 end-3 flex gap-2 py-1 px-3 text-xs rounded-full text-white bg-main">
                {" "}
                {offer.sellingPrice ? (
                  <span>
                    {offer.sellingPrice} {t("singleProduct:currency")}
                  </span>
                ) : null}
                {t("singleProduct:insteadOf")}
                {offer.itemPrice ? (
                  <span>
                    {offer.itemPrice} {t("singleProduct:currency")}
                  </span>
                ) : null}
              </div>
              <img
                src={BASE_URL_Img + offer?.image}
                alt={offer.name}
                className="h-full w-full object-cover"
              />
            </SwiperSlide>
          ))}
        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
    </>
  );
};
export default OffersSlider;
