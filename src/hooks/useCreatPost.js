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
         const creatPostInput = useRef('')
                        const [caption ,setCaption] = useState("")
                        const [imagFile,setImageFile] = useState(null)
                        const [imagePreview,setImagePreview] = useState("")
 
          function createTest(e){
            
                }

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
        setImageFile(null)
        setIsEdite(false)
        setImagePreview("")
        setCaption("")
    }

    function handleImage() {
       
      setImage(URL.createObjectURL(imageInput.current.files[0]))  

    }
        function creatPosts(){

       

                    const PostData={
                        body:caption,
                        image:imagFile
                    }
                    
                    if(caption.trim()== "" && imagFile == null){
                        return onError()
                    }
            const formData = new FormData()
            if(caption){

                formData.append('body',caption)
            }
            if(imagFile){

                formData.append('image',imagFile)
            }
                  
          
            const options2 = {
                method:'POST',
                url:'https://linked-posts.routemisr.com/posts',
                headers:{
                    token
                },
                data:formData
            }
           return axios.request(options2)
        }
   const {mutate} = useMutation({
        mutationFn:creatPosts,
        onSuccess:(res)=>{
            console.log(res);
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
            if(imagFile){
                  myForm2.append('image',imagFile)
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
                caption,
                setCaption,
                imagFile,
                setImageFile,
                createTest,
                creatPosts,
                imagePreview,
                setImagePreview,
            }
}