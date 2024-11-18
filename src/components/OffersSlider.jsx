import { useNavigate } from "react-router-dom";
import { BASE_URL, BASE_URL_Img } from "../constatns";
import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import "react-awesome-slider/dist/styles.css";

const AutoplaySlider = withAutoplay(AwesomeSlider);

const OffersSlider = ({ offers }) => {
  console.log("====================================");
  console.log(offers);
  console.log("====================================");
  const navigate = useNavigate();
  return (
    <AutoplaySlider
      cancelOnInteraction={true}
      play={true}
      interval={3000}
      organicArrows={false}
      bullets={false}
      fillParent={false}
    >
      {offers
        .sort((a, b) => a.id - b.id)
        .map((offer, i) => (
          <button
            className="cursor-pointer h-56 shadow-md rounded-lg overflow-hidden w-full"
            key={i}
            onClick={() => navigate(`/offer/${offer._id}`)}
          >
            <img
              src={BASE_URL_Img + offer?.image}
              alt={offer.name}
              className="h-full w-full object-fill"
            />
          </button>
        ))}
    </AutoplaySlider>
  );
};

export default OffersSlider;
