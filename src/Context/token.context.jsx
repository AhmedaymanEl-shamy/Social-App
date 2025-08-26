import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const TokenContext = createContext(null)



export default function TokenProvider({children}){

      const [token,setToken] = useState(localStorage.getItem('token'))
      const [userId,setUserId] = useState('')
      const [isEdite, setIsEdite]=useState(false)
      const [felUpdate,setFelUpdate] = useState(false)
       function logingOut(){
        setToken(null)
    localStorage.removeItem('token')
}

      useEffect(()=>{
        if(token){
          const {user} =  jwtDecode(token)
          setUserId(user)
          
        }
      },[token])

    return <TokenContext.Provider value={{token,setToken,logingOut,userId,felUpdate,setFelUpdate,isEdite,setIsEdite}}>
        {children}
    </TokenContext.Provider>
}