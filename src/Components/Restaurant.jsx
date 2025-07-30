import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useGlobalContext } from "../Utils/GlobalContext"
import Card from './Card'
import { useNavigate } from 'react-router-dom'
import Skeleton from './Skeleton'

const Restaurant = () => {
  const nav = useNavigate()
  const [sliderData, setSLiderData] = useState([])
  const [topRes, setTopRes] = useState([])
  const [resTitle, setResTitle] = useState("")
  const [nearbyRes, setNearbyRes] = useState([])

  const { cdn, long, lat } = useGlobalContext()

  const scrollFn = (direction) => {
    const mySlider = document.getElementById("slider")
    const slideAmount = 200
    mySlider.scrollBy({
      left: direction === 'left' ? -slideAmount : slideAmount,
      behavior: 'smooth'
    })
  }

  const scrollFn2 = (direction) => {
    const mySlider2 = document.getElementById("slider2")
    const slideAmount = 200
    mySlider2.scrollBy({
      left: direction === 'left' ? -slideAmount : slideAmount,
      behavior: 'smooth'
    })
  }

  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch(`https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${long}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`)
        let apiData = await res.json()
        setSLiderData(apiData.data?.cards[0]?.card?.card?.imageGridCards?.info || [])
        setTopRes(apiData.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants || [])
        setResTitle(apiData.data?.cards[1]?.card?.card?.header?.title || "")
        setNearbyRes(apiData.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants || [])
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  }, [lat, long])

  if (sliderData.length === 0) {
    return (
      <>
        <Navbar />
        <Skeleton />
      </>
    )
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      <Navbar />

      {/* Slider Section */}
      {sliderData.length > 0 &&
        <div className='w-full md:w-[80vw] mx-auto mt-10 bg-white p-4 rounded shadow'>
          <div className='flex justify-between items-center mb-4'>
            <p className='font-bold text-lg sm:text-xl'>What's on your mind?</p>
            <div className='flex gap-3 text-xl text-gray-700'>
              <div onClick={() => scrollFn("left")} className='cursor-pointer'><i className="fa-solid fa-arrow-left"></i></div>
              <div onClick={() => scrollFn("right")} className='cursor-pointer'><i className="fa-solid fa-arrow-right"></i></div>
            </div>
          </div>

          <div id='slider' className='flex overflow-x-auto gap-4 hide-scrollbar'>
            {sliderData.map((item) => {
              let item_name = item.action.text
              let str = item.action.link.slice(35, 40)
              return (
                <img
                  onClick={() => nav(`/slider-data/${str}/${item_name}`)}
                  className='h-32 md:h-40 cursor-pointer rounded-md hover:scale-105 transition-transform'
                  key={item.id}
                  src={cdn + item.imageId}
                  alt=""
                />
              )
            })}
          </div>
        </div>
      }

      {/* Top Restaurants */}
      {topRes.length > 0 &&
        <div className='w-full md:w-[80vw] mx-auto mt-10 bg-white p-4 rounded shadow'>
          <div className='flex justify-between items-center mb-4'>
            <p className='font-bold text-lg sm:text-xl'>{resTitle}</p>
            <div className='flex gap-3 text-xl text-gray-700'>
              <div onClick={() => scrollFn2("left")} className='cursor-pointer'><i className="fa-solid fa-arrow-left"></i></div>
              <div onClick={() => scrollFn2("right")} className='cursor-pointer'><i className="fa-solid fa-arrow-right"></i></div>
            </div>
          </div>

          <div id='slider2' className='flex overflow-x-auto gap-4 hide-scrollbar'>
            {topRes.map((item) => (
              <Card
                resId={item.info.id}
                size={"sm"}
                cuisines={item.info.cuisines}
                slaString={item.info.sla?.slaString}
                avgRating={item.info.avgRating}
                name={item.info.name}
                subHeader={item.info.aggregatedDiscountInfoV3?.subHeader}
                header={item.info.aggregatedDiscountInfoV3?.header}
                key={item.info.id}
                areaName={item.info.areaName}
                imageId={item.info.cloudinaryImageId}
              />
            ))}
          </div>
        </div>
      }

      {/* Nearby Restaurants */}
      {nearbyRes.length > 0 &&
        <div className='w-full md:w-[80vw] mx-auto mt-10 p-4'>
          <p className='font-bold text-lg sm:text-xl mb-4'>Restaurants with online food delivery in Noida 1</p>

          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
            {nearbyRes.map((item) => (
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
  )
}

export default Restaurant
