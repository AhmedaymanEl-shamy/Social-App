import { useContext, useRef, useState } from "react"
import { TokenContext } from "../Context/token.context"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import toast from "react-hot-toast"


export function useCreatPost(postId){
     const  {token,setIsEdite} = useContext(TokenContext)
    const [modalOpen, setModalOpen] = useState(false)
    const [image, setImage] = useState(null)
    const imageInput = useRef('')
    const bodyInput = useRef('')
    const QueryClient = useQueryClient()
    console.log(setIsEdite);
    

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

    const {data,isError,isLoading}= useQuery({
        queryKey:['get user data'],
        queryFn:getUserData,
        
    })

  
    

    function handleModalOpen() {
        setModalOpen(true)
    }

    function handleCloseOpen() {
        setModalOpen(false)
        setImage(null)
        setIsEdite(false)
    }

    function handleImage() {
       
      setImage(URL.createObjectURL(imageInput.current.files[0]))  

    }
        function creatPosts(){

         const myForm  = new FormData()
         
                if(bodyInput.current.value){
                    myForm.append('body',bodyInput.current.value)
                }
            if(imageInput.current.files[0]){
                  myForm.append('image',imageInput.current.files[0])
            }
       

            const options2 = {
                method:'POST',
                url:'https://linked-posts.routemisr.com/posts',
                headers:{
                    token
                },
                data:myForm
            }
           return axios.request(options2)
        }
   const {mutate} = useMutation({
        mutationFn:creatPosts,
        onSuccess:(res)=>{
            console.log(res);
            bodyInput.current.value=''
            QueryClient.invalidateQueries(['get all posts'])
            toast.success('Post created')
            handleCloseOpen()
            
        },
        onError:(error)=>{
            console.log(error);
            toast.error("you can't post nothing")
            
        }
    })
            
            function handleUpdatePost(){
           
                   const myForm2  = new FormData()
           if(bodyInput.current.value){
            myForm2.append('body', bodyInput.current.value)
           }
            if(imageInput.current.value[0]){
                  myForm2.append('image',imageInput.current.files[0])
            }
                const options3 = {
                    method:'PUT',
                    url:`https://linked-posts.routemisr.com/posts/${postId}`,
                    headers:{
                        token
                    },
                      data:myForm2
                }
                return  axios.request(options3)
            }

           const {mutate:handleUpdateMutate} = useMutation({
                mutationFn:handleUpdatePost,
                    onSuccess:(res)=>{
                console.log(res);
              bodyInput.current.value=''
            QueryClient.invalidateQueries(['get all posts'])
            toast.success('Post updated successfully')
            handleCloseOpen()
            
        },
          onError:(error)=>{
            console.log(error);
            toast.error(error.response.data.error)
            
        }

            })

            return{
                modalOpen,
                setModalOpen,
                image,
                setImage,
                data,
                isError,
                isLoading,
                handleModalOpen,
                handleCloseOpen,
                handleImage,
                mutate,
                handleUpdateMutate,
                bodyInput,
                imageInput,
            }
}