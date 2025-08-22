import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useGlobalContext } from "../Utils/GlobalContext"
import Card from './Card'
import { useNavigate } from 'react-router-dom'
import Skeleton from './Skeleton'

const Search = () => {
  const nav = useNavigate()
  const [searchResults, setSearchResults] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [searchSuggestions, setSearchSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  const { cdn, long, lat } = useGlobalContext()

  // Function to get search suggestions
  const getSearchSuggestions = async (query) => {
    if (query.length < 2) {
      setSearchSuggestions([])
      return
    }
    
    try {
      const res = await fetch(`https://www.swiggy.com/dapi/restaurants/search/suggest?lat=${lat}&lng=${long}&str=${query}&trackingId=undefined&includeIMItem=true`)
      const apiData = await res.json()
      setSearchSuggestions(apiData.data?.suggestions || [])
    } catch (error) {
      console.log("Error fetching suggestions:", error)
    }
  }

  // Function to search restaurants
  const searchRestaurants = async (query) => {
    if (!query.trim()) {
      setSearchResults([])
      return
    }

    setIsLoading(true)
    try {
      const res = await fetch(`https://www.swiggy.com/dapi/restaurants/search/v3?lat=${lat}&lng=${long}&str=${query}&trackingId=undefined&submitAction=ENTER&queryUniqueId=undefined`)
      const apiData = await res.json()
      
      // Extract restaurant data from the API response
      const restaurants = apiData.data?.cards?.find(card => 
        card.groupedCard?.cardGroupMap?.RESTAURANT?.cards
      )?.groupedCard?.cardGroupMap?.RESTAURANT?.cards || []
      
      const filteredRestaurants = restaurants
        .filter(card => card.card?.card?.info)
        .map(card => card.card.card)
      
      setSearchResults(filteredRestaurants)
    } catch (error) {
      console.log("Error searching restaurants:", error)
      setSearchResults([])
    } finally {
      setIsLoading(false)
    }
  }

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value
    setSearchQuery(query)
    setShowSuggestions(true)
    
    // Debounce suggestions
    clearTimeout(window.suggestionTimeout)
    window.suggestionTimeout = setTimeout(() => {
      getSearchSuggestions(query)
    }, 300)
  }

  // Handle search submission
  const handleSearch = (query = searchQuery) => {
    setShowSuggestions(false)
    searchRestaurants(query)
  }

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    const query = suggestion.text
    setSearchQuery(query)
    setShowSuggestions(false)
    searchRestaurants(query)
  }

  // Handle key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      <Navbar />

      {/* Search Section */}
      <div className='w-full md:w-[80vw] mx-auto mt-10 bg-white p-4 rounded shadow'>
        <div className='relative'>
          <div className='flex items-center border-2 border-gray-300 rounded-lg overflow-hidden focus-within:border-orange-500'>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyPress={handleKeyPress}
              onFocus={() => setShowSuggestions(true)}
              placeholder="Search for restaurants, cuisine or a dish"
              className='flex-1 p-3 outline-none text-sm sm:text-base'
            />
            <button
              onClick={() => handleSearch()}
              className='bg-orange-500 hover:bg-orange-600 text-white px-4 py-3 transition-colors'
            >
              <i className="fa-solid fa-search"></i>
            </button>
          </div>

          {/* Search Suggestions */}
          {showSuggestions && searchSuggestions.length > 0 && (
            <div className='absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-b-lg shadow-lg z-10 max-h-60 overflow-y-auto'>
              {searchSuggestions.map((suggestion, index) => (
                <div
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className='p-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0'
                >
                  <div className='flex items-center gap-3'>
                    <i className="fa-solid fa-search text-gray-400"></i>
                    <span className='text-sm sm:text-base'>{suggestion.text}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Search Results */}
      {isLoading ? (
        <div className='w-full md:w-[80vw] mx-auto mt-10'>
          <Skeleton />
        </div>
      ) : searchResults.length > 0 ? (
        <div className='w-full md:w-[80vw] mx-auto mt-10 p-4'>
          <p className='font-bold text-lg sm:text-xl mb-4'>
            Search Results for "{searchQuery}" ({searchResults.length} restaurants)
          </p>

          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
            {searchResults.map((item) => (
              <Card
                resId={item.info.id}
                cuisines={item.info.cuisines}
                slaString={item.info.sla?.slaString}
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
      ) : searchQuery && !isLoading ? (
        <div className='w-full md:w-[80vw] mx-auto mt-10 p-4 text-center'>
          <div className='bg-white p-8 rounded shadow'>
            <i className="fa-solid fa-search text-4xl text-gray-400 mb-4"></i>
            <p className='text-lg font-semibold text-gray-600 mb-2'>No restaurants found</p>
            <p className='text-gray-500'>Try searching for something else</p>
          </div>
        </div>
      ) : (
        <div className='w-full md:w-[80vw] mx-auto mt-10 p-4 text-center'>
          <div className='bg-white p-8 rounded shadow'>
            <i className="fa-solid fa-utensils text-4xl text-orange-500 mb-4"></i>
            <p className='text-lg font-semibold text-gray-600 mb-2'>Search for restaurants</p>
            <p className='text-gray-500'>Find your favorite restaurants, cuisines, and dishes</p>
          </div>
        </div>
      )}

      {/* Click outside to hide suggestions */}
      {showSuggestions && (
        <div
          className='fixed inset-0 z-0'
          onClick={() => setShowSuggestions(false)}
        />
      )}
    </div>
  )
}

export default Search