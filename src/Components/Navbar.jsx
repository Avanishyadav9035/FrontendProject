import { useNavigate } from "react-router-dom"
import navLogo from "../assets/navlogo.svg"
import { useEffect, useState } from "react"
import { useGlobalContext } from "../Utils/GlobalContext"
import HoverCart from "./HoverCart"

const Navbar = () => {
  const nav = useNavigate()
  const [place, setPlace] = useState("My Address")
  const { lat, long } = useGlobalContext()
  const [showCart, setShowCart] = useState(false)
  const [timeoutId, setTimeoutId] = useState("")

  useEffect(() => {
    async function getLocation() {
      if (!lat || !long) return
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${long}`)
      const data = await res.json()
      setPlace(data.display_name)
    }
    getLocation()
  }, [lat, long])

  return (
    <>
      <div className="bg-white flex flex-wrap justify-between items-center shadow-lg px-4 sm:px-10 md:px-20 py-3 gap-3">
        {/* Logo & Address */}
        <div className="flex items-center gap-3 sm:gap-5 flex-wrap">
          <img
            onClick={() => nav("/")}
            src={navLogo}
            alt="logo"
            className="w-28 sm:w-36 cursor-pointer"
          />
          <p className="text-sm sm:text-base hover:text-orange-400 cursor-pointer max-w-[60vw] sm:max-w-[30vw] truncate">
            <span className="underline">Other</span> &nbsp;
            {place && place.length > 20 ? place.slice(0, 30) : place}...
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-end items-center gap-4 text-sm sm:text-base">
          <button onClick={() => nav("/search")} className="hover:text-orange-500 cursor-pointer">
            <i className="fa-solid fa-magnifying-glass"></i>&nbsp;Search
          </button>
          <button onClick={() => nav("/help")} className="hover:text-orange-500 cursor-pointer">
            <i className="fa-solid fa-question"></i>&nbsp;Help
          </button>
          <button className="hover:text-orange-500 cursor-pointer">
            <i className="fa-solid fa-user"></i>&nbsp;Sign In
          </button>
          <button
            onClick={() => nav("/cart")}
            onMouseLeave={() => {
              const idOfHover = setTimeout(() => setShowCart(false), 3000)
              setTimeoutId(idOfHover)
            }}
            onMouseEnter={() => setShowCart(true)}
            className="hover:text-orange-500 cursor-pointer"
          >
            <i className="fa-solid fa-cart-shopping"></i>&nbsp;Cart
          </button>
        </div>
      </div>

      {/* Hover Cart */}
      {showCart && <HoverCart timeoutId={timeoutId} setter={setShowCart} />}
    </>
  )
}

export default Navbar
