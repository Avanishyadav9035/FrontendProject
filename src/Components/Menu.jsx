import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../Utils/GlobalContext'
import { useParams } from 'react-router-dom'
import Navbar from './Navbar'
import Accordion from './Accordion'
import NestedUI from './NestedUI'

const Menu = () => {
  const { lat, long, cdn } = useGlobalContext()
  const { resId } = useParams()
  const [menuData, setMenuData] = useState([])
  const [resData, setResData] = useState({})
  const [carData, setCarData] = useState([])

  function scrollFn(dir) {
    const scrollAmt = 200
    const dabba = document.getElementById("car")
    dabba.scrollBy({
      left: dir === "right" ? scrollAmt : -scrollAmt,
      behavior: 'smooth'
    })
  }

  useEffect(() => {
    async function getData() {
      const res = await fetch(`https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${long}&restaurantId=${resId}&catalog_qa=undefined&submitAction=ENTER`)
      const data = await res.json()
      let arr = data.data.cards[4].groupedCard.cardGroupMap.REGULAR.cards.slice(1)

      if (arr[0].card.card.carousel) {
        setCarData(arr[0].card.card.carousel)
        arr = arr.slice(1)
      }

      setMenuData(arr.slice(0, arr.length - 2))
      setResData(arr[arr.length - 1].card.card)
    }

    getData()
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      {menuData.length > 0 && (
        <div className="w-full max-w-screen-md mx-auto mt-10 px-4 sm:px-6 flex flex-col items-center">
          <div className="text-center mb-10">
            <h1 className="font-extrabold text-2xl sm:text-3xl">{resData.name}</h1>
            <p className="text-gray-600 mt-3 text-sm sm:text-base">{resData.completeAddress}</p>
          </div>

          <span className="text-lg sm:text-xl font-semibold mt-4">Menu</span>
          <hr className="border w-full border-gray-200 mt-4 mb-6" />

          {carData.length > 0 && (
            <div className="w-full mb-10">
              <div className="flex justify-between items-center mb-3">
                <p className="text-base sm:text-lg font-bold">Top Picks</p>
                <div className="flex gap-4 text-lg">
                  <div className="cursor-pointer" onClick={() => scrollFn("left")}><i className="fa-solid fa-arrow-left"></i></div>
                  <div className="cursor-pointer" onClick={() => scrollFn("right")}><i className="fa-solid fa-arrow-right"></i></div>
                </div>
              </div>
              <div
                id="car"
                className="flex overflow-x-scroll hide-scrollbar gap-4 pb-2"
              >
                {carData.map((item, index) => (
                  <img
                    key={index}
                    className="h-40 w-40 sm:h-52 sm:w-52 rounded-2xl object-cover flex-shrink-0"
                    src={cdn + item.dish.info.imageId}
                    alt=""
                  />
                ))}
              </div>
            </div>
          )}

          {menuData.map((item, idx) => {
            const { card } = item.card
            return (
              <div key={idx} className="w-full mb-5">
                {card.itemCards ? (
                  <>
                    <Accordion title={card.title} data={card.itemCards} />
                  </>
                ) : (
                  <NestedUI title={card.title} data={card.categories} />
                )}
                <div className="h-4 w-full bg-gray-100 mt-5"></div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Menu
