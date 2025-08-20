import { Routes, Route, Navigate } from "react-router-dom"
import Landing from "./Components/Landing"
import { lazy, Suspense, useEffect, useState } from "react"
import { useGlobalContext } from "./Utils/GlobalContext"
import Navbar from "./Components/Navbar"
import Skeleton from "./Components/Skeleton"
import toast, { Toaster } from 'react-hot-toast';
import Cart from "./Components/Cart"
import Help from "./Components/Help"
import Login from "./Components/Login"
import Signup from "./Components/Signup"

const Restaurant = lazy(()=>import('./Components/Restaurant'))
const SliderItemData = lazy(()=>import('./Components/SliderItemData'))
const Menu = lazy(()=>import('./Components/Menu'))
const Search = lazy(()=>import('./Components/Search'))
const Error = lazy(()=>import('./Components/Error'))

const App = () => {
  const { setLat, setLong } = useGlobalContext()

  // 👇 Auth ko state me rakho
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  )

  // jab bhi login/logout ho, state update karo
  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(localStorage.getItem("isAuthenticated") === "true")
    }
    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  // Location fetch
  navigator.geolocation.getCurrentPosition((position) => {
    const lat = position.coords?.latitude
    const long = position.coords?.longitude
    setLat(lat)
    setLong(long)
  })

  return (
    <div>
      <Toaster/>
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/signup" element={<Signup />} />

        {/* Home Protected */}
        <Route 
          path="/" 
          element={isAuthenticated ? <Landing /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/home" 
          element={isAuthenticated ? <Landing /> : <Navigate to="/login" />} 
        />

        {/* Other Routes */}
        <Route element={
          <Suspense fallback={<><Navbar/><Skeleton/></>}>
            <Restaurant />
          </Suspense>
        } path="/restaurants" />

        <Route element={<Menu/>} path="/menu/:resId"/>
        <Route element={<Cart/>} path="/cart"/>
        <Route element={<Help/>} path="/help"/>

        <Route element={
          <Suspense fallback={<><Navbar/><Skeleton/></>}>
            <Search/>
          </Suspense>
        } path="/search"/>

        <Route element={<SliderItemData/>} path="/slider-data/:itemId/:text"/>
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  )
}

export default App
