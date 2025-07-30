import React, { useState } from 'react';
import AccordionCard from './AccordionCard';

const Accordion = ({ title, data, isNested, isLast }) => {
  const [showDropDown, setShowDropDown] = useState(true);

  return (
    <div
      className={
        'w-full mb-3 px-2 md:px-6 ' +
        (isNested ? (isLast ? '' : 'border-b border-gray-200 pb-3') : '')
      }
    >
      <div className='flex justify-between items-center'>
        <p className='text-base md:text-lg font-medium'>
          {title} ({data.length})
        </p>
        <i
          onClick={() => setShowDropDown(!showDropDown)}
          className={`fa-solid text-gray-600 cursor-pointer text-lg ${
            showDropDown ? 'fa-angle-up' : 'fa-angle-down'
          }`}
        ></i>
      </div>

      {showDropDown && (
        <div className='mt-2 space-y-2'>
          {data.map((item, index) => (
            <AccordionCard
              key={index}
              info={item.card.info}
              isLast={index === data.length - 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Accordion;
