import { useContext, useState } from "react"
import { TokenContext } from "../Context/token.context"
import axios from "axios"
import { useQuery } from "@tanstack/react-query"

export function useProfile(){
   const [openUserPhoto,setopenUserPhoto] = useState(false)
const {token,userId} = useContext(TokenContext)
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

    const {data:userData}= useQuery({
        queryKey:['get user data'],
        queryFn:getUserData
    })
  function getUserPosts(){
      const options = {
        method:'GET',
        url:`https://linked-posts.routemisr.com/users/${userId}/posts`,
        headers:{
          token,
        }
      }
       return axios.request(options)
  }
  const {data,isLoading,isError,error}=useQuery({
    queryKey:['user posts', userId],
    queryFn:getUserPosts,
    enabled:!!userId
  
  })

  return {
    data,
    isLoading,
    isError,
    error,
    userData,
    openUserPhoto,
    setopenUserPhoto
  }
}