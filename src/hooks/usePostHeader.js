import { useContext, useRef, useState } from "react"
import { TokenContext } from "../Context/token.context"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import toast from "react-hot-toast"

export function usePostHeader(commentId,postId){
     console.log(commentId);
     
 const {userId,token,setFelUpdate,felUpdate,isEdite,setIsEdite} = useContext(TokenContext)
 const QueryClient =  useQueryClient()
 const [commentUpdate,setCommentUpdate]  = useState(false)
  const commentInput = useRef('')

function handleCommnetUpdateInput(){
  setCommentUpdate(!commentUpdate)
  setFelUpdate(!felUpdate)
}

function handleCloseCommnetUpdateInput(){
  setCommentUpdate(false)
  setFelUpdate(false)
}
  

 function handleCommentUpdate(){
            const options={
      method:'PUT',
      url:`https://linked-posts.routemisr.com/comments/${commentId}`,
      data:{
        content:commentInput.current.value,
      },
      headers:{
        token,
      }
    }
       return axios.request(options)
}
  const{mutate:commentUpdateMutate,isPending} = useMutation({
    mutationFn:handleCommentUpdate,
    onSuccess:(resp)=>{
       commentInput.current.value=''
        toast.success('Comment Created Successfully')
        QueryClient.invalidateQueries(['get all posts'])
        setFelUpdate(false)
        setCommentUpdate(false)
    },
    onError:(error)=>{
        
        toast.error(error.response.data.error)
        
    }
  })
  



 function deletePost(){
  const options = {
    method:'DELETE',
    url:`https://linked-posts.routemisr.com/posts/${postId}`,
    headers:{
      token,
    }
  }
  return axios.request(options)
 }
 const {mutate:DeletePostMutate} = useMutation({
  mutationFn:deletePost,
  onSuccess:()=>{
    toast.success('Post Deleted')
    QueryClient.invalidateQueries(['get all posts'])
  },
  onError:()=>{
    toast.error('somthing went wrong')
  }
    
  }
 )
 function deleteComment(){
  const options = {
    method:'DELETE',
    url:`https://linked-posts.routemisr.com/comments/${commentId}`,
    headers:{
      token,
    }
  }
  return axios.request(options)
 }
 const {mutate:deleteCommentMutate} = useMutation({
  mutationFn:deleteComment,
  onSuccess:()=>{
    toast.success('Comment Deleted')
    QueryClient.invalidateQueries(['get all posts'])
  },
  onError:()=>{
    toast.error('somthing went wrong')
  }
    




  
}
 


 )

 return {
    isEdite,
    setIsEdite,
    userId,
    handleCommentUpdate,
    handleCommnetUpdateInput,
    handleCloseCommnetUpdateInput,
    DeletePostMutate,
    deleteCommentMutate,
    commentUpdateMutate,
    isPending,
    commentUpdate,
    commentInput,
    isEdite,
    setIsEdite
    
 }


}