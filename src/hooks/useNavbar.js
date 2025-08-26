import { useContext, useState } from "react"
import axios from "axios"
import { useQuery } from "@tanstack/react-query"
import { TokenContext } from "../Context/token.context"

export function useNavbar(){
   
 
     const {token,logingOut} = useContext(TokenContext)

 function getUserData(){


        const options = {
            method:'GET',
            url:'https://linked-posts.routemisr.com/users/profile-data',
            headers:{
                token,
            }
        }
            
             return axios.request(options)
    }

    const {data,isLoading,isError,error}= useQuery({
        queryKey:['get user data'],
        queryFn:getUserData
    })

   return {
  
    data,
    isLoading,
    isError,
    error

   }
}