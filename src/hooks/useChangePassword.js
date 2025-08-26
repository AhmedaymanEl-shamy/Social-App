import * as zod from 'zod'
import { useContext, useState } from "react";
import { TokenContext } from "../Context/token.context";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const shceme = zod.object({
  password:zod.string().nonempty('password is required'),
  newPassword:zod.string().nonempty('password is required').regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/,'Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:')
})


export function useChangePassword(setopenform){
  const navigate = useNavigate()
    const [isLoading , setIsLoading] = useState(false)
      const {token,setToken} = useContext(TokenContext)
     const {handleSubmit,register,formState:{errors}} = useForm({
      defaultValues:{
        "password":"",
        "newPassword":"",
      },
      resolver:zodResolver(shceme),  
      mode:'onChange'
     });
       
        
     function handleChangePassword(values){
        console.log(values);
      
        const options ={
            method:'PATCH',
            url:'https://linked-posts.routemisr.com/users/change-password',
            headers:{
                token
            },
            data:values

        }

        return axios.request(options)
     }
            const {mutate} = useMutation({
                mutationFn:handleChangePassword,
                onSuccess:(res)=>{
                    console.log(res);
                    toast.success('Password changed')
                    navigate('/login')
                    setToken(res.data.token)
                    setIsLoading(null)
                    setopenform(null)
                    
                },
                onError:(err)=>{
                    console.log(err);
                    toast.error(err.error)
                    
                    
                }
            })

            return {
                isLoading,
                setIsLoading,
                handleSubmit,
                register,
                errors,
                mutate
            }
}