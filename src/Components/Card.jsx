import { useNavigate } from "react-router-dom";
import greenImg from "../assets/cardGreenIcon.svg";
import { useGlobalContext } from "../Utils/GlobalContext";

const Card = ({
  resId,
  key,
  header,
  subHeader,
  imageId,
  name,
  avgRating,
  slaString,
  cuisines,
  areaName,
  size,
}) => {
  const navigate = useNavigate();
  const { cdn } = useGlobalContext();

  return (
    <div
      onClick={() => navigate("/menu/" + resId)}
      className="hover:cursor-pointer hover:shadow-lg transition-all duration-300 bg-white p-3 rounded-xl w-full max-w-[100%] sm:max-w-[250px] md:max-w-[300px] lg:max-w-[320px] flex-shrink-0"
      key={key}
    >
      <div className="relative w-full">
        <img
          src={cdn + imageId}
          alt={name}
          className="w-full h-[160px] sm:h-[180px] md:h-[200px] object-cover rounded-xl"
        />
        {header && (
          <p className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs sm:text-sm font-semibold px-2 py-1 rounded">
            {header + subHeader}
          </p>
        )}
      </div>

      <div className="mt-3">
        <h2 className="font-semibold text-sm sm:text-base text-gray-800 break-words leading-snug">
          {name.length > 25 ? name.slice(0, 25) + "..." : name}
        </h2>
        <p className="flex items-center text-xs sm:text-sm text-gray-700 mt-1">
          <img src={greenImg} alt="rating icon" className="w-4 h-4 mr-1" />
          {avgRating} • {slaString}
        </p>
        <p className="text-xs sm:text-sm text-gray-500 mt-1 break-words leading-snug">
          {cuisines.join(", ").length > 45
            ? cuisines.join(", ").slice(0, 45) + "..."
            : cuisines.join(", ")}
        </p>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">{areaName}</p>
      </div>
    </div>
  );
};

export default Card;
