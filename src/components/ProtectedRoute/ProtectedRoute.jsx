import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { TokenContext } from '../../Context/token.context'

export default function ProtectedRoute({children}) {
        const {token}  =  useContext(TokenContext)
if(token){
   return <div className='bg-slate-200'>{children}</div>
}else{
  return  <Navigate to={'/login'} /> 
}
}
