import { useContext } from "react"
import { TokenContext } from "../Context/token.context"
import axios from "axios"
import { useQuery } from "@tanstack/react-query"

export function useHome(){
     const  {token} = useContext(TokenContext)
        
    
          function getAllPosts(){
            const options = {
              method:'GET',
              url:'https://linked-posts.routemisr.com/posts?limit=30&sort=-createdAt',
              headers:{
                token,
              }
            } 
            return axios.request(options)
          }
    
         const {data,error,isLoading,isError,isFetching} = useQuery({
            queryKey:['get all posts'],
            queryFn: getAllPosts,
           
          })
          
          return {
            data,
            error,
            isError,
            isFetching,
            isLoading
          }

}