import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as zod from 'zod'





const shceme = zod.object({
  name:zod.string().nonempty('name is required').min(3,'name must be more than 3 vhars').max(20,'name must be less than 20 chars'),
  email:zod.string().nonempty('email is required').regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,'email must be valid'),
  password:zod.string().nonempty('password is required').regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/,'password must contain capital char and number and sympol '),
  rePassword:zod.string().nonempty('Confirm passsword is required'),
  dateOfBirth:zod.coerce.date().refine((date)=>{
    const birthDay = date.getFullYear();
    const now = new Date().getFullYear();
    const age = now - birthDay;
    return age >= 18;
  },{message:'age must be atleast 18 or more'}),
  gender:zod.string().nonempty('gender is required').regex(/^(male|female)$/,'enter valid gender')
  
}).refine((data)=> data.password === data.rePassword,{message:'password must much',path:['rePassword']})


export function useRegister(){
     const navigate =  useNavigate()
  const [isLoading , setIsLoading] = useState(false)
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

 
 
function handleRegister(data){
 setIsLoading(true)
  const option={
    method:'POST',
    url:"https://linked-posts.routemisr.com/users/signup",
    data,

  }
  axios.request(option)
  .then(({data})=>{
    toast.success('Registered Successfully')
    navigate('/login')
    setIsLoading(false)
    
  })
  .catch((err)=>{
    toast.error(err.response.data.error)
    setIsLoading(false)
   
    
  })
}

        return{
            isLoading,
            handleSubmit,
            register,
            errors,
            handleRegister,

        }
}