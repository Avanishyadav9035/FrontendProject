import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useGlobalContext } from '../Utils/GlobalContext'
import { useDispatch } from 'react-redux'
import { addItem } from '../Utils/CartSlice'

const Instamart = () => {
  const [data, setData] = useState([])
  const { cdn2 } = useGlobalContext()
  const dispatch = useDispatch()

  useEffect(() => {
    async function getData() {
      const res = await fetch(
        `https://www.swiggy.com/api/instamart/home/v2?offset=2&layoutId=4987&storeId=1394451&clientId=INSTAMART-APP`
      )
      
      const json = await res.json()
      console.log(json)

      setData(
        json.data?.cards[0]?.card?.card?.gridElements?.infoWithStyle?.items || []
      )
    }
    getData()
  }, [])

  const handleAddToCart = (item) => {
    const variation = item.variations?.[0]
    const price = variation?.price

    // Create cart item object matching your cart structure
    const cartItem = {
      id: item.id || `instamart-${Date.now()}-${Math.random()}`, // Generate unique ID
      name: item.displayName,
      // Convert price to paise (multiply by 100) to match your cart format
      defaultPrice: price?.offerPrice?.units ? price.offerPrice.units * 100 : price?.mrp?.units * 100,
      price: price?.mrp?.units ? price.mrp.units * 100 : price?.offerPrice?.units * 100,
      category: 'Instamart',
      description: variation?.quantityDescription || '',
      imageId: variation?.imageIds?.[0] || '',
      quantity: 1 // This will be handled by the cart slice
    }

    // Dispatch to cart with a mock restaurant ID for Instamart
    dispatch(addItem({ 
      resId: 'instamart-store', 
      info: cartItem 
    }))
  }

  return (
    <div className="p-4">
      <Navbar />

     {data.length > 0 &&
      <div className='w-full md:w-[80vw] mx-auto mt-10 p-4'>
        <h1 className='font-bold text-lg md:text-xl mb-4'>Hot Deals</h1>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
            {
              data.map((item, index) => {
                const variation = item.variations?.[0]
                const price = variation?.price
                // ✅ Image with CDN from context
                const imgUrl = variation?.imageIds?.[0]
                  ? `${cdn2}${variation.imageIds[0]}`
                  : 'https://via.placeholder.com/150'
           
                return(
                  <div key={index}
                     className="rounded-2xl shadow p-3 bg-white hover:shadow-lg transition"
                  >
                    <img
                      src={imgUrl}
                      alt="instamart"
                      className="w-full h-40 object-cover rounded-2xl shadow-md p-2 bg-white hover:scale-105 transition-transform duration-300 ease-in-out" 
                    />
                    <h3 className='text-sm font-semibold mt-2 line-clamp-2'>
                      {item.displayName}
                    </h3>
                    <p className='text-xs text-gray-500'>
                      {variation?.quantityDescription}
                    </p>

                    <div className='flex text-center gap-2 mt-1'>
                      <span className="font-bold text-sm">
                        ₹{price?.offerPrice?.units}
                      </span>
                      <span className="line-through text-gray-400 text-xs">
                        ₹{price?.mrp?.units}
                      </span>
                      <span className="text-green-600 text-xs font-semibold">
                        {price?.offerApplied?.listingDescription}
                      </span>
                    </div>
                    
                    <button 
                      onClick={() => handleAddToCart(item)}
                      className='mt-2 w-full bg-green-500 text-white py-1 rounded-lg text-sm font-semibold hover:bg-green-600 transition-colors'
                    >
                      + Add to Cart
                    </button>
                  </div>
                )
              })
            }
          </div> 
     </div>
     }
      
    </div>
  )
}

export default Instamart