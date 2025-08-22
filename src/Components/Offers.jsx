import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Cbanner from '../assets/Cbanner.avif'
import { useGlobalContext } from '../Utils/GlobalContext'
import Card from './Card'

const Offers = () => {
const[offerData, setOfferData] = useState([])
const { cdn, long, lat } = useGlobalContext()

    useEffect(()=>{
       async function getData() {
          try{
             const res = await fetch(`https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${long}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`)
             const data = await res.json()
             setOfferData(data.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants || [])
          } catch(error){
            console.log(error)
          }
       }
       getData()
    },[lat, long])
  return (
    <div>
      <Navbar/>
        <div className="flex justify-center mt-10">
        <img 
          src={Cbanner} 
          alt="Banner" 
          className="w-[80%] h-[400px] object-cover rounded-2xl shadow-md"
        />
      </div>
      <div className=' w-full md:w-[80vw] mx-auto mt-10 p-4'>
      <h1 className="font-bold text-lg sm:text-xl mb-4 underline decoration-[#fc8019] underline-offset-4">
        Dineout
       </h1>
        
        {
          offerData.length>0 &&
          <div className='w-full md:w-[80vw] mx-auto mt-10 p-4'>
   
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
            {offerData.map((item) => (
              <Card
                resId={item.info.id}
                cuisines={item.info.cuisines}
                slaString={item.info.sla.slaString}
                avgRating={item.info.avgRating}
                name={item.info.name}
                subHeader={item.info?.aggregatedDiscountInfoV3?.subHeader || ""}
                header={item.info?.aggregatedDiscountInfoV3?.header || ""}
                key={item.info.id}
                areaName={item.info.areaName}
                imageId={item.info.cloudinaryImageId}
              />
            ))}
          </div>

          </div>
        }
         
      </div>
    </div>
  )
}

export default Offers
