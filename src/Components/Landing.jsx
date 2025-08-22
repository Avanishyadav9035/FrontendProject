import React from 'react'
import logoImg from '../assets/logo.png'
import one from '../assets/one.avif'
import two from '../assets/two.avif'
import three from '../assets/three.avif'
import four from '../assets/four.avif'
import { useNavigate } from 'react-router-dom'
import left from '../assets/left.avif'
import right from '../assets/right.avif'

const Landing = () => {
  const navigate = useNavigate()

  return (
    <div className='bg-[#FF5200] min-h-screen relative overflow-x-hidden'>
      {/* Navbar */}
      <nav className='flex flex-wrap justify-between items-center p-4 md:p-6'>
        <img className='h-10 md:h-12' src={logoImg} alt="Logo" />
        <div className='flex flex-wrap items-center gap-3 md:gap-4 text-white text-sm md:text-base mt-4 md:mt-0'>
          <p 
         className="whitespace-nowrap cursor-pointer text-gray-1100 hover:text-gray-700 active:text-orange-700 transition-colors duration-300 font-medium"
          onClick={() => navigate('/swiggycorporate')}
       >
       Swiggy Corporate
      </p>

      <p 
      className="whitespace-nowrap cursor-pointer text-gray-1100 hover:text-gray-700 active:text-orange-700 transition-colors duration-300 font-medium"
      onClick={() => navigate('/offers')}
       >
     Offers
     </p>

          <button className='border border-white rounded-lg py-2 px-4 md:py-3 md:px-6'>
            Get The App
            <i className="fa-solid fa-arrow-right fa-sm text-white ml-2"></i>
          </button>
         
        </div>
      </nav>

      {/* Content */}
      <div className='flex flex-col items-center gap-6 mt-10 text-center px-4'>
        <h1 className='text-white text-2xl md:text-4xl leading-snug'>
          Order food & groceries. Discover <br className='hidden md:block' />
          best restaurants. Swiggy it!
        </h1>

        {/* Search Bar */}
        {/* <div className='h-12 w-full max-w-[600px] relative'>
          <input onClick={()=>{
            navigate('/search')
          }}
            className='bg-white h-full w-full rounded px-4 outline-none text-sm md:text-base'
            type="text"
            placeholder='Search for restaurant, items or more'
          />
          <i className="fa-solid fa-magnifying-glass absolute top-3.5 right-5 text-gray-500"></i>
        </div> */}

        {/* Service Images */}
        <div className='flex flex-wrap justify-center gap-4 mt-4'>
          <img
            onClick={() => navigate('/restaurants')}
            className='h-40 md:h-60 cursor-pointer transition-transform hover:scale-105'
            src={one}
            alt=""
          />
          <img
            onClick={() => navigate('/instamart')}
            className='h-40 md:h-60 cursor-pointer transition-transform hover:scale-105'
            src={two}
            alt=""
          />
          <img
            onClick={() => navigate('/offers')}
            className='h-40 md:h-60 cursor-pointer transition-transform hover:scale-105'
            src={three}
            alt=""
          />
          <img
            onClick={() => navigate('/genie')}
            className='h-40 md:h-60 cursor-pointer transition-transform hover:scale-105'
            src={four}
            alt=""
          />
        </div>
      </div>

      {/* Background Images */}
      <img
        className='absolute top-20 left-0 h-64 md:h-[90vh] hidden sm:block z-0'
        src={left}
        alt=""
      />
      <img
        className='absolute top-20 right-0 h-64 md:h-[90vh] hidden sm:block z-0'
        src={right}
        alt=""
      />
    </div>
  )
}

export default Landing
