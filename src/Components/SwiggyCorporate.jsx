import React from 'react'
import Navbar from './Navbar'
import Video from '../assets/video.mp4'
import Mission from '../assets/Mission.png'
import Group from '../assets/Group.jpg'

const SwiggyCorporate = () => {
  return (
    <div>
      <Navbar/>
      <div className="bg-gray-50 min-h-screen py-16 px-4">
         <div className="max-w-6xl mx-auto text-center">
             <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8 tracking-wide">ABOUT US</h1>
             <p className="text-lg md:text-xl text-gray-600 mb-16 max-w-4xl mx-auto leading-relaxed">
               Swiggy is a new-age consumer-first organization offering an easy-to-use convenience platform, accessible through a unified app.
             </p>
             
             {/* Services Section */}
             <div className="relative">
               {/* Background decorative elements */}
               <div className="absolute inset-0 opacity-10">
                 <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                   <defs>
                     <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                       <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#ddd" strokeWidth="1"/>
                     </pattern>
                   </defs>
                   <rect width="100" height="100" fill="url(#grid)" />
                 </svg>
               </div>
               
               {/* Service Icons Layout */}
               <div className="relative z-10 flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-16">
                 
                 {/* Food Service */}
                 <div className="flex flex-col items-center group">
                   <div className="relative">
                     <div className="w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center mb-4 group-hover:shadow-xl transition-shadow duration-300">
                       <div className="text-3xl">🍽️</div>
                     </div>
                     <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                       <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                     </div>
                   </div>
                   <h3 className="text-xl font-semibold text-gray-800 mt-2">Food</h3>
                 </div>

                 {/* Connecting Lines */}
                 <div className="hidden md:block">
                   <div className="w-24 h-px bg-orange-300"></div>
                 </div>
                 
                 {/* Instamart Service */}
                 <div className="flex flex-col items-center group">
                   <div className="relative">
                     <div className="w-24 h-24 bg-white rounded-full shadow-lg flex items-center justify-center mb-4 group-hover:shadow-xl transition-shadow duration-300">
                       <div className="text-4xl">🛒</div>
                     </div>
                     <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                       <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                     </div>
                   </div>
                   <h3 className="text-xl font-semibold text-gray-800 mt-2">Instamart</h3>
                 </div>

                 {/* Connecting Lines */}
                 <div className="hidden md:block">
                   <div className="w-24 h-px bg-orange-300"></div>
                 </div>
                 
                 {/* Dineout Service */}
                 <div className="flex flex-col items-center group">
                   <div className="relative">
                     <div className="w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center mb-4 group-hover:shadow-xl transition-shadow duration-300">
                       <div className="text-3xl">🍷</div>
                     </div>
                     <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                       <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                     </div>
                   </div>
                   <h3 className="text-xl font-semibold text-gray-800 mt-2">Dineout</h3>
                 </div>
               </div>
               
               {/* Central Swiggy Logo */}
               <div className="mt-12 flex justify-center">
                 <div className="w-16 h-20 bg-orange-500 rounded-lg flex items-center justify-center shadow-lg transform rotate-45 origin-center">
                   <div className="text-white text-4xl font-bold transform -rotate-45">S</div>
                 </div>
               </div>
             </div>
         </div>
      </div>
    
    {/* IPO Video Section */}
      <div className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* IPO Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-12 h-px bg-orange-400"></div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-700 tracking-wide">
                IPO DELIVERED - NOVEMBER 2024
              </h1>
              <div className="w-12 h-px bg-orange-400"></div>
            </div>
          </div>

          {/* Video Player */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-black rounded-2xl overflow-hidden shadow-2xl">
              <video 
                src={Video} 
                controls 
                className="w-full aspect-video"
                poster="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzMzMzMzMyIvPjx0ZXh0IHg9IjUwIiB5PSI1MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPklQTyBWaWRlbzwvdGV4dD48L3N2Zz4="
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </div>
 
    <div>
        <div>
            <div className='text-center mb-12'>
                <div className='flex items-center justify-center gap-4 mb-4'>
                    <div className='w-12 h-px bg-orange-400'></div>
                    <h1  className='text-2xl md:text-3xl font-bold text-gray-700 tracking-wide'
                    >GET TO KNOW US</h1>
                    <div className='w-12 h-px bg-orange-400'></div>
                </div>
            </div>
            <div className="grid md:grid-cols-2 gap-12 items-center">
                 {/* Left Side - Navigation and Content */}
                <div>
                     <div className="space-y-8">
                        <div className='border-l-4 border-orange-500 pl-6'>
                            <h3 className='text-xl font-semibold text-orange-500 mb-3 cursor-pointer flex items-center'>
                                 Mission  <span className="ml-2">→</span>
                            </h3>
                            <p className='text-gray-600 leading-relaxed'>
                                Our mission is to elevate the quality of life of the urban consumer by offering unparalleled convenience. 
                            Convenience is what makes us tick. It's what makes us get out of bed and say, "Let's do this.
                            </p>
                        </div>

                        <div className='border-l-4 border-gray-200 pl-6'>
                            <h3 className='text-xl font-semibold text-gray-400 mb-4 cursor-pointer hover:text-orange-500 transition-colors'>Vision</h3>
                        </div>

                        <div className='border-l-4 border-gray-200 pl-6'>
                            <h3 className='text-xl font-semibold  text-gray-400 mb-4 cursor-pointer hover:text-orange-500'>Values</h3>
                        </div>
                     </div>
                </div>

                <div className='flex justify-center'>
                    <div className='w-full max-w-lg'>
                        <img src={Mission} alt="Delivery person on motorcycle" className='w-full h-80 object-cover rounded-2xl shadow-lg' />
                    </div>
                </div>
            </div>
        </div>
    </div>
   
    <div className="bg-gray-50 py-16 px-4">
        <div className='max-w-6xl mx-auto'>
            <div className='text-center mb-16'>
                <div className='flex items-center justify-center gap-4 mb-4'>
                    <div className='w-12 h-px bg-orange-400'></div>
                    <h1 className='text-2xl md:text-3xl font-bold text-gray-700  tracking-wide'>INDUSTRY PIONEER</h1>
                    <div className='w-12 h-px bg-orange-400'></div>
                </div>
            </div>

          
                <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
                  <div>
                     <p className='text-lg text-gray-600 leading-relaxed'>
                        Being among the first few entrants, Swiggy has successfully pioneered the hyperlocal commerce industry in India, launching Food Delivery in 2014 and Quick Commerce in 2020. Due to the pioneering status of Swiggy, it is well-recognised as a leader in innovation in hyperlocal commerce and as a brand synonymous with the categories it is present in.
                     </p>
                  </div>
                  <div className='flex justify-center'>
                     <div className='w-full max-w-lg'>
                       <img src={Group} alt="" className='w-full h-80 object-cover rounded-2xl shadow-lg border-1 border-black'/>
                     </div>
                  </div>
                </div>
          
        </div>
    </div>

   <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            {/* 3 Billion+ */}
            <div className="text-center border-r border-gray-200 last:border-r-0">
              <div className="text-3xl md:text-4xl font-bold text-green-500 mb-2">3 Billion+</div>
              <p className="text-gray-600">orders delivered</p>
            </div>

            {/* 220k+ */}
            <div className="text-center border-r border-gray-200 last:border-r-0">
              <div className="text-3xl md:text-4xl font-bold text-green-500 mb-2">220k+</div>
              <p className="text-gray-600">restaurant partners</p>
            </div>

            {/* 520k+ */}
            <div className="text-center border-r border-gray-200 last:border-r-0">
              <div className="text-3xl md:text-4xl font-bold text-green-500 mb-2">520k+</div>
              <p className="text-gray-600">delivery partners</p>
            </div>

            {/* 680+ */}
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-green-500 mb-2">680+</div>
              <p className="text-gray-600">cities in India</p>
            </div>
          </div>

    </div>
  )
}

export default SwiggyCorporate