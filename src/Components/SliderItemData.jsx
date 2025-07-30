import React, { useEffect, useState } from 'react';
import { useGlobalContext } from '../Utils/GlobalContext';
import Navbar from './Navbar';
import { useParams } from 'react-router-dom';
import Skeleton from './Skeleton.jsx';
import Card from './Card.jsx';

const SliderItemData = () => {
  const [itemsData, setItemsData] = useState([]);
  const { lat, long } = useGlobalContext();
  const { itemId, text } = useParams();

  useEffect(() => {
    async function getData() {
      const url = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${long}&collection=${itemId}&tags=${text}&sortBy=&filters=&type=rcv2&offset=0&page_type=null`;
      const res = await fetch(url);
      const data = await res.json();
      setItemsData(data.data.cards.splice(2));
    }
    getData();
  }, []);

  return (
    <div>
      <Navbar />
      <h2 className='text-2xl md:text-3xl font-bold ml-4 md:ml-[150px] mt-6'>{text}</h2>

      {!itemsData.length > 0 ? (
        <Skeleton />
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 px-4 md:px-0 w-full md:w-[80vw] mx-auto mt-5'>
          {itemsData.map((item) => {
            const info = item.card.card.info;
            return (
              <Card
                key={info.id}
                resId={info.id}
                cuisines={info.cuisines}
                slaString={info.sla.slaString}
                avgRating={info.avgRating}
                name={info.name}
                subHeader={info?.aggregatedDiscountInfoV3?.subHeader || ""}
                header={info?.aggregatedDiscountInfoV3?.header || ""}
                areaName={info.areaName}
                imageId={info.cloudinaryImageId}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SliderItemData;
