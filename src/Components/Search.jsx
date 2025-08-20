import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { useGlobalContext } from '../Utils/GlobalContext';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const { lat, long, cdn } = useGlobalContext();
  const [query, setQuery] = useState('');
  const [suggestion, setSuggestion] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!query) {
      setSuggestion([]);
      return;
    }

    const timer = setTimeout(() => {
      async function getSuggestions() {
        try {
          const res = await fetch(
            `https://www.swiggy.com/dapi/restaurants/search/suggest?lat=${lat}&lng=${long}&str=${query}&trackingId=undefined&includeIMItem=true`
          );
          const data = await res.json();
          setSuggestion(data.data?.suggestions || []);
        } catch (error) {
          console.error('Suggestion fetch error:', error);
        }
      }
      getSuggestions();
    }, 800); // reduce debounce time if needed

    return () => clearTimeout(timer);
  }, [query, lat, long]);

  const handleSuggestionClick = async (item) => {
    try {
      // If it's a restaurant — navigate directly
      if (item.type === 'RESTAURANT' && item.entityId) {
        const restaurantId = item.entityId.split('_')[1];
        navigate(`/restaurant/${restaurantId}`);
      } else {
        // If it's not a restaurant — find parent restaurant
        const res = await fetch(
          `https://www.swiggy.com/dapi/restaurants/search/v3?lat=${lat}&lng=${long}&str=${item.text}&trackingId=undefined&submitAction=SUGGESTION`
        );
       
        const data = await res.json();
        const firstRestaurant = data.data?.cards?.find(
          (card) => card.card?.card?.type === 'restaurant'
        );

        const restaurantId =
          firstRestaurant?.card?.card?.restaurant?.info?.id;
        

        if (restaurantId) {
          navigate(`/restaurant/${restaurantId}`);
        } else {
          alert('Restaurant not found.');
        }
      }
    } catch (error) {
      console.error('Navigation failed:', error);
      alert('Failed to load restaurant.');
    }
  };

  return (
    <div className="w-full min-h-screen">
      <Navbar />
      <div className="flex flex-col mx-auto items-center mt-20 w-full px-4 sm:px-6 md:px-10 max-w-[600px]">
        <div className="relative w-full">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            placeholder="Search Anything"
            className="border w-full h-[45px] border-gray-400 px-4 rounded outline-none text-lg"
          />
          {suggestion.length > 0 ? (
            <i
              onClick={() => setQuery('')}
              className="fa-solid fa-xmark absolute top-3.5 right-4 cursor-pointer"
            ></i>
          ) : (
            <i className="fa-solid fa-magnifying-glass absolute top-3.5 right-4"></i>
          )}
        </div>

        {suggestion.length > 0 && (
          <div className="w-full mt-4 space-y-3">
            {suggestion.map((item, index) => (
              <div
                key={index}
                onClick={() => handleSuggestionClick(item)}
                className="flex gap-4 p-3 border rounded hover:bg-blue-100 cursor-pointer"

              >
                {item.cloudinaryId && (
                  <img
                    className="h-[80px] w-[80px] object-cover rounded"
                    src={cdn + item.cloudinaryId}
                    alt={item.text}
                  />
                )}
                <div className="flex flex-col justify-center">
                  <p className="font-medium">{item.text}</p>
                  <p className="text-sm text-gray-500">{item.type}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
