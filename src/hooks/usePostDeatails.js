import { useContext } from "react"
import { useParams } from "react-router-dom"
import { TokenContext } from "../Context/token.context"
import axios from "axios"
import { useQuery } from "@tanstack/react-query"


export function usePostDeatails(){
     const {id} = useParams()
   const {token} = useContext(TokenContext)

   function getPostCom(){

    const options ={
        method:'GET',
        url:`https://linked-posts.routemisr.com/posts/${id}`,
        headers:{
        token,
        }

    }
        return axios.request(options)


   }
    const {data,error,isError,isLoading} =  useQuery({
    queryKey:['post deatils',id],
    queryFn:getPostCom
   })


   return {
        data,
        error,
        isError,
        isLoading
   }
  
}