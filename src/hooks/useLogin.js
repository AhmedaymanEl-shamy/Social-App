import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TokenContext } from "../Context/token.context";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import toast from "react-hot-toast";
import * as zod from 'zod'

const shceme = zod.object({
  email:zod.string().nonempty('email is required').regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,'email must be valid'),
  password:zod.string().nonempty('password is required').regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/,'Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:')
})

export function useLogin(){
      const navigate =  useNavigate()
  const [isLoading , setIsLoading] = useState(false)
  const {setToken} = useContext(TokenContext)
 const {handleSubmit,register,formState:{errors}} = useForm({
  defaultValues:{
    "name": "",
    "email":"",
    "password":"",
    "rePassword":"",
    "dateOfBirth":"",
    "gender":""
  },
  resolver:zodResolver(shceme),  
  mode:'onBlur'
 });

 async function handleLogin(values){
   setIsLoading(true)
    try {
      const options={
        method:'POST',
        url:'https://linked-posts.routemisr.com/users/signin',
        data:values
      }
      const {data}= await axios.request(options)
      setToken(data.token)
      localStorage.setItem('token',data.token)
      // navigate('/login')
      setIsLoading(false)
      toast.success('Logged in successfully')
      
    } catch (error) {
     
      setIsLoading(false)
      toast.error(error.response.data.error)
    }
}  

   return {
    isLoading,
    setIsLoading,
    handleSubmit,
    register,
    errors,
    handleLogin,
    shceme,
   } 
}