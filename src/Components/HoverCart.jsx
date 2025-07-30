import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const HoverCart = ({ timeoutId, setter }) => {
  const cartSliceData = useSelector((store) => store.cart);
  const [total, setTotal] = useState(0);
  const nav = useNavigate();

  useEffect(() => {
    let ans = 0;
    cartSliceData.data.forEach((item) => {
      ans += item.quantity * (item.defaultPrice / 100 || item.price / 100);
    });
    setTotal(ans.toFixed(2));
  }, [cartSliceData]);

  return (
    <div
      onMouseLeave={() => setter(false)}
      onMouseEnter={() => clearTimeout(timeoutId)}
      className="absolute z-50 mt-2 right-[5vw] sm:right-[3vw] md:right-[2vw] lg:right-[5vw] bg-white shadow-2xl border-t-2 border-orange-500 p-4 sm:p-5 w-[90vw] sm:w-[60vw] md:w-[40vw] lg:w-[25vw] max-h-[70vh] overflow-y-auto rounded-md"
    >
      {cartSliceData.data.length > 0 && (
        <div className="space-y-2">
          {cartSliceData.data.map((item, index) => (
            <div
              key={index}
              className="flex justify-between text-sm gap-2 sm:gap-3"
            >
              <p className="truncate w-[70%]">
                {item.name.length > 30
                  ? item.name.slice(0, 30) + "..."
                  : item.name}{" "}
                x {item.quantity}
              </p>
              <span className="w-[30%] text-right">
                ₹{(
                  (item.defaultPrice / 100 || item.price / 100) * item.quantity
                ).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      )}
      <hr className="border-dotted mt-3" />
      <div className="flex justify-between mt-4 text-sm">
        <div>
          <h2 className="font-semibold">Sub total</h2>
          <p className="text-gray-600 text-xs">
            Extra charges may apply
          </p>
        </div>
        <p className="font-semibold">₹{total}</p>
      </div>
      <button
        onClick={() => nav("/cart")}
        className="mt-4 bg-orange-500 hover:bg-orange-600 w-full py-2 sm:py-3 text-white font-medium rounded"
      >
        CHECKOUT
      </button>
    </div>
  );
};

export default HoverCart;
