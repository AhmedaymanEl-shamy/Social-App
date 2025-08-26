import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useContext, useRef } from "react"
import toast from "react-hot-toast"
import { TokenContext } from './../Context/token.context';

export function usePost(post){
    
  const user = post.user
  const posyHasImage = !!post.image
  const firstComment = post.comments[0]  
  const {token ,felUpdate} = useContext(TokenContext)
  const queryClient  =  useQueryClient()
  const commentInput = useRef('')
    

  

   function handleComment(){
          const options={
      method:'POST',
      url:'https://linked-posts.routemisr.com/comments',
      data:{
        content:commentInput.current.value,
        post: post.id
      },
      headers:{
        token,
      }
    }
    return axios.request(options)
    
 
  }

  const{mutate,isPending} = useMutation({
    mutationFn:handleComment,
    onSuccess:(resp)=>{
       commentInput.current.value=''
        toast.success('Comment Created Successfully')
        queryClient.invalidateQueries(['get all posts'])
    },
    onError:(error)=>{
        
        toast.error(error.response.data.error)
        
    }
    
  })
  

  return {
    user,
    posyHasImage,
    firstComment,
    commentInput,
    mutate,
    isPending,
    felUpdate
  }
}