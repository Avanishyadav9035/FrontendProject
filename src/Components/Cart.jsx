import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { addItem, removeItem } from '../Utils/CartSlice'

const Cart = () => {
  const cartSliceData = useSelector(store => store.cart)
  const [total, setTotal] = useState(0)
  const dispatch = useDispatch()

  useEffect(() => {
    let val = 0
    cartSliceData.data.map((item) => {
      val += (item.quantity * (item.defaultPrice / 100 || item.price / 100))
    })
    setTotal(val)
  }, [cartSliceData.data])

  return (
    <div>
      <Navbar />
      
      <div className='space-y-4 p-4 bg-gray-50 rounded-lg shadow-md w-full max-w-3xl mx-auto mt-10'>
        {cartSliceData.data.map((item) => {
          return (
            <div key={item.id}
              className='flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-white rounded-lg shadow-sm gap-2'
            >
              <p className='text-base sm:text-lg font-medium'>{item.name}</p>

              <div className='flex items-center mt-2 sm:mt-0 gap-x-3'>
                <button
                  onClick={() => {
                    dispatch(addItem({ resId: cartSliceData.id, info: item }))
                  }}
                  className='px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition'
                >+</button>

                <div className='text-md font-semibold'>{item.quantity}</div>

                <button
                  onClick={() => {
                    dispatch(removeItem({ id: item.id }))
                  }}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >-</button>
              </div>

              <p className='text-lg font-bold text-gray-700'>
                ₹{((item.defaultPrice / 100 || item.price / 100) * item.quantity).toFixed(2)}
              </p>
            </div>
          )
        })}
      </div>

      {
        cartSliceData.data.length > 0 && (
          <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center border border-gray-300 rounded-lg bg-white shadow-sm w-full max-w-3xl mx-auto mt-6 px-6 py-4 gap-2'>
            <h2 className='text-lg sm:text-xl font-semibold text-gray-800'>Grand Total</h2>
            <p className='text-lg sm:text-xl font-bold text-green-600'>₹{total.toFixed(2)}</p>
          </div>
        )
      }
    </div>
  )
}

export default Cart
