import React, { useState } from 'react'
import Navbar from './Navbar'
import { useGlobalContext } from '../Utils/GlobalContext'
import { useNavigate } from 'react-router-dom'

const Genie = () => {
  const navigate = useNavigate()
  const { long, lat } = useGlobalContext()
  
  const [pickupAddress, setPickupAddress] = useState('')
  const [dropAddress, setDropAddress] = useState('')
  const [itemDescription, setItemDescription] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [estimatedPrice, setEstimatedPrice] = useState(50)
  const [showBooking, setShowBooking] = useState(false)

  // Service categories
  const serviceCategories = [
    { id: 'documents', name: 'Documents', icon: 'fa-file-text', description: 'Important papers, contracts' },
    { id: 'food', name: 'Food/Tiffin', icon: 'fa-utensils', description: 'Lunch boxes, home food' },
    { id: 'medicines', name: 'Medicines', icon: 'fa-pills', description: 'Prescription, health items' },
    { id: 'groceries', name: 'Groceries', icon: 'fa-shopping-basket', description: 'Daily essentials' },
    { id: 'laundry', name: 'Laundry', icon: 'fa-tshirt', description: 'Clothes, dry cleaning' },
    { id: 'electronics', name: 'Electronics', icon: 'fa-mobile-alt', description: 'Gadgets, repairs' },
    { id: 'keys', name: 'Keys/Cards', icon: 'fa-key', description: 'House keys, ID cards' },
    { id: 'other', name: 'Other Items', icon: 'fa-box', description: 'Miscellaneous items' }
  ]

  // Popular services
  const popularServices = [
    { title: 'Send Lunch Box', subtitle: 'Deliver homemade food', icon: 'fa-utensils', category: 'food' },
    { title: 'Document Pickup', subtitle: 'Important papers delivery', icon: 'fa-file-text', category: 'documents' },
    { title: 'Medicine Delivery', subtitle: 'Prescription & health items', icon: 'fa-pills', category: 'medicines' },
    { title: 'Grocery Shopping', subtitle: 'Buy and deliver groceries', icon: 'fa-shopping-basket', category: 'groceries' },
    { title: 'Laundry Pickup', subtitle: 'Collect & deliver clothes', icon: 'fa-tshirt', category: 'laundry' },
    { title: 'Key Delivery', subtitle: 'House keys, access cards', icon: 'fa-key', category: 'keys' }
  ]

  const handleCategorySelect = (category) => {
    setSelectedCategory(category.id)
    setShowBooking(true)
  }

  const handlePopularServiceClick = (service) => {
    setSelectedCategory(service.category)
    setItemDescription(service.title)
    setShowBooking(true)
  }

  const calculateEstimatedPrice = () => {
    // Simple distance-based pricing (mock calculation)
    const basePrice = 50
    const distanceMultiplier = Math.floor(Math.random() * 30) + 10 // Mock distance calculation
    return basePrice + distanceMultiplier
  }

  const handleBookGenie = () => {
    if (!pickupAddress || !dropAddress || !itemDescription) {
      alert('Please fill all required fields')
      return
    }

    // Mock booking confirmation
    alert(`Genie booked successfully! 
Estimated Price: ₹${estimatedPrice}
Your delivery partner will contact you soon.`)
    
    // Reset form
    setPickupAddress('')
    setDropAddress('')
    setItemDescription('')
    setSelectedCategory('')
    setShowBooking(false)
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      <Navbar />

      {!showBooking ? (
        <>
          {/* Hero Section */}
          <div className='w-full md:w-[80vw] mx-auto mt-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg shadow-lg text-white p-8'>
            <div className='text-center'>
              <h1 className='text-3xl md:text-4xl font-bold mb-4'>
                <i className="fa-solid fa-magic mr-3"></i>
                Swiggy Genie
              </h1>
              <p className='text-lg mb-6'>Your personal delivery partner for anything, anywhere in the city</p>
              <div className='flex flex-wrap justify-center gap-6 text-sm'>
                <div className='flex items-center gap-2'>
                  <i className="fa-solid fa-clock text-yellow-300"></i>
                  <span>Quick Delivery</span>
                </div>
                <div className='flex items-center gap-2'>
                  <i className="fa-solid fa-shield-alt text-green-300"></i>
                  <span>Safe & Secure</span>
                </div>
                <div className='flex items-center gap-2'>
                  <i className="fa-solid fa-rupee-sign text-blue-300"></i>
                  <span>Starting ₹50</span>
                </div>
              </div>
            </div>
          </div>

          {/* Popular Services */}
          <div className='w-full md:w-[80vw] mx-auto mt-10 bg-white p-6 rounded-lg shadow'>
            <h2 className='font-bold text-xl mb-6'>Popular Services</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
              {popularServices.map((service, index) => (
                <div
                  key={index}
                  onClick={() => handlePopularServiceClick(service)}
                  className='p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-purple-500 hover:shadow-md transition-all'
                >
                  <div className='flex items-center gap-3'>
                    <div className='w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center'>
                      <i className={`fa-solid ${service.icon} text-purple-600`}></i>
                    </div>
                    <div>
                      <h3 className='font-semibold text-sm'>{service.title}</h3>
                      <p className='text-xs text-gray-500'>{service.subtitle}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Service Categories */}
          <div className='w-full md:w-[80vw] mx-auto mt-10 bg-white p-6 rounded-lg shadow'>
            <h2 className='font-bold text-xl mb-6'>What do you want to send?</h2>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
              {serviceCategories.map((category) => (
                <div
                  key={category.id}
                  onClick={() => handleCategorySelect(category)}
                  className='p-4 text-center border-2 border-gray-200 rounded-lg cursor-pointer hover:border-purple-500 hover:shadow-md transition-all'
                >
                  <div className='w-16 h-16 bg-purple-100 rounded-full mx-auto mb-3 flex items-center justify-center'>
                    <i className={`fa-solid ${category.icon} text-2xl text-purple-600`}></i>
                  </div>
                  <h3 className='font-semibold text-sm mb-1'>{category.name}</h3>
                  <p className='text-xs text-gray-500'>{category.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* How it Works */}
          <div className='w-full md:w-[80vw] mx-auto mt-10 bg-white p-6 rounded-lg shadow mb-10'>
            <h2 className='font-bold text-xl mb-6'>How Genie Works</h2>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              <div className='text-center'>
                <div className='w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center'>
                  <span className='text-2xl font-bold text-blue-600'>1</span>
                </div>
                <h3 className='font-semibold mb-2'>Tell us what to pick</h3>
                <p className='text-sm text-gray-600'>Select category and describe your item</p>
              </div>
              <div className='text-center'>
                <div className='w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center'>
                  <span className='text-2xl font-bold text-green-600'>2</span>
                </div>
                <h3 className='font-semibold mb-2'>Add pickup & drop location</h3>
                <p className='text-sm text-gray-600'>Enter addresses for collection and delivery</p>
              </div>
              <div className='text-center'>
                <div className='w-16 h-16 bg-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center'>
                  <span className='text-2xl font-bold text-purple-600'>3</span>
                </div>
                <h3 className='font-semibold mb-2'>Get it delivered</h3>
                <p className='text-sm text-gray-600'>Track your delivery in real-time</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        /* Booking Form */
        <div className='w-full md:w-[80vw] mx-auto mt-10 bg-white p-6 rounded-lg shadow'>
          <div className='flex items-center gap-3 mb-6'>
            <button 
              onClick={() => setShowBooking(false)}
              className='text-purple-600 hover:text-purple-800'
            >
              <i className="fa-solid fa-arrow-left text-xl"></i>
            </button>
            <h2 className='font-bold text-xl'>Book Your Genie</h2>
          </div>

          <div className='space-y-6'>
            {/* Item Details */}
            <div>
              <label className='block text-sm font-semibold mb-2'>What are you sending?</label>
              <input
                type="text"
                value={itemDescription}
                onChange={(e) => setItemDescription(e.target.value)}
                placeholder="Describe your item (e.g., Documents, Lunch box, etc.)"
                className='w-full p-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 outline-none'
              />
            </div>

            {/* Pickup Address */}
            <div>
              <label className='block text-sm font-semibold mb-2'>Pickup Address</label>
              <textarea
                value={pickupAddress}
                onChange={(e) => setPickupAddress(e.target.value)}
                placeholder="Enter complete pickup address with landmarks"
                className='w-full p-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 outline-none h-20 resize-none'
              />
            </div>

            {/* Drop Address */}
            <div>
              <label className='block text-sm font-semibold mb-2'>Drop Address</label>
              <textarea
                value={dropAddress}
                onChange={(e) => setDropAddress(e.target.value)}
                placeholder="Enter complete drop address with landmarks"
                className='w-full p-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 outline-none h-20 resize-none'
              />
            </div>

            {/* Price Estimation */}
            <div className='bg-purple-50 p-4 rounded-lg'>
              <div className='flex justify-between items-center'>
                <span className='font-semibold'>Estimated Price:</span>
                <span className='text-2xl font-bold text-purple-600'>₹{estimatedPrice}</span>
              </div>
              <p className='text-xs text-gray-600 mt-1'>*Final price may vary based on actual distance and item type</p>
            </div>

            {/* Book Button */}
            <button
              onClick={handleBookGenie}
              className='w-full bg-purple-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-purple-700 transition-colors'
            >
              <i className="fa-solid fa-magic mr-2"></i>
              Book Genie - ₹{estimatedPrice}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Genie