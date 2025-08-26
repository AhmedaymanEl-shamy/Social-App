import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { TokenContext } from '../../Context/token.context'

export default function GuestRoute({children}) {
     const {token} =  useContext(TokenContext)
    if(token){
        return <Navigate to={'/home'}/>
    }else{
        return <div className='bg-slate-200'>{children}</div>
    }
}
