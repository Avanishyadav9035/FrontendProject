import React from 'react';
import { useGlobalContext } from '../Utils/GlobalContext';
import veg from '../assets/veg.svg';
import nonVeg from '../assets/nonveg.svg';
import ratingStar from "../assets/ratingStar.svg";
import { addItem, removeItem } from '../Utils/CartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const AccordionCard = ({ info, isLast }) => {
  const { resId } = useParams();
  const { name, price, imageId, description, isVeg, defaultPrice, id } = info;
  const rating = info.ratings?.aggregatedRating?.rating;
  const { cdn } = useGlobalContext();
  const dispatch = useDispatch();
  const cartData = useSelector(store => store.cart);

  const foundItem = cartData.data.find(item => item.id === id);

  return (
    <div className={`flex flex-col md:flex-row justify-between gap-4 md:items-center md:h-[200px] mb-6 ${!isLast ? 'border-b border-gray-300 pb-4' : ''}`}>
      
      {/* LEFT TEXT SECTION */}
      <div className='w-full md:w-[70%]'>
        <img className='h-4 mb-1' src={isVeg ? veg : nonVeg} alt="" />
        <p className='font-bold text-base sm:text-lg'>{name}</p>
        <p className='text-sm sm:text-base'>₹{Number(price || defaultPrice) / 100}</p>
        {rating && (
          <span className='flex items-center text-sm text-yellow-600 gap-1 mt-1'>
            <img src={ratingStar} alt="" className='h-4' /> {rating}
          </span>
        )}
        <p className='text-sm sm:text-base text-gray-600 mt-2'>{description}</p>
      </div>

      {/* RIGHT IMAGE + BUTTON SECTION */}
      <div className='relative md:h-full w-full md:w-[30%] flex justify-center md:justify-end'>
        <img className='h-40 md:h-[90%] object-cover rounded-md' src={cdn + imageId} alt="" />

        {/* Button block */}
        {!foundItem ? (
          <button
            onClick={() => dispatch(addItem({ info, resId }))}
            className='absolute bottom-2 md:bottom-4 bg-white text-green-600 font-semibold py-1 px-4 rounded-lg shadow-md'>
            ADD
          </button>
        ) : (
          <div className='absolute bottom-2 md:bottom-4 flex items-center gap-2 border bg-white border-gray-300 rounded-full px-3 py-1'>
            <button
              onClick={() => dispatch(addItem({ info, resId }))}
              className='text-lg font-bold text-gray-700 hover:text-green-600'>
              +
            </button>
            <p className='text-base font-medium text-gray-800'>{foundItem.quantity}</p>
            <button
              onClick={() => dispatch(removeItem({ id }))}
              className='text-lg font-bold text-gray-700 hover:text-red-600'>
              -
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccordionCard;
