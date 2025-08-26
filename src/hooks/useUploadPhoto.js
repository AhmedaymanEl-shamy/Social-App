import { useContext, useRef, useState } from "react"
import { TokenContext } from "../Context/token.context"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import toast from "react-hot-toast"

 export function useUploadPhoto (){
      const {token} = useContext(TokenContext)
   const [image, setImage] = useState(false)
    const QueryClient = useQueryClient()
  const imageInput = useRef('')
     const [openFrom,setopenform] = useState(false)

    function handleImage() {
       
      setImage(URL.createObjectURL(imageInput.current.files[0]))  

    }
    function UploadUserImage(){

         const myForm  = new FormData()
            if(imageInput.current.value[0]){
                  myForm.append('photo',imageInput.current.files[0])
            }
                
            const options2 = {
                method:'PUT',
                url:'https://linked-posts.routemisr.com/users/upload-photo',
                headers:{
                    token
                },
                data:myForm
            }
           return axios.request(options2)
        }
   const {mutate} = useMutation({
        mutationFn:UploadUserImage,
        onSuccess:(res)=>{
            console.log(res);
            QueryClient.invalidateQueries(['get all posts'])
            setImage(null)
            toast.success('Photo uploaded')
           
            
        },
        onError:(error)=>{
            console.log(error);
            toast.error(error.response.data.error)
            
        }
    })


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

    const {data:userData,isError,isLoading,error}= useQuery({
        queryKey:['get user data'],
        queryFn:getUserData
    })


  return {
            image,
            setImage,
            openFrom,
            setopenform,
            handleImage,
            imageInput,
            mutate,
            userData,
            isError,
            isLoading,
            error,
  }
}