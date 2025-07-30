import React from 'react';
import Accordion from './Accordion';

const NestedUI = ({ title, data }) => {
  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8">
      <p className="text-base sm:text-lg md:text-xl font-bold mb-4">{title}</p>
      <div>
        {data.map((item, index) => {
          return (
            <Accordion
              key={index}
              title={item.title}
              data={item.itemCards}
              isNested={true}
              isLast={index === data.length - 1}
            />
          );
        })}
      </div>
    </div>
  );
};

export default NestedUI;
