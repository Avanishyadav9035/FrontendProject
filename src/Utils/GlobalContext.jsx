import { createContext, useContext, useState } from "react";

const globalContext = createContext()


export const GlobalContext = ({children}) => {
    const[lat, setLat] = useState()
    const[long, setLong] = useState()
    // console.log(lat,long)
    const cdn = "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/"
   
    const cdn2 = "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/"

    return (
        <globalContext.Provider value={{cdn,cdn2, setLat, setLong, long, lat}}>
            {children}
        </globalContext.Provider>
    )
}


export function useGlobalContext()
{
    return useContext(globalContext)
}