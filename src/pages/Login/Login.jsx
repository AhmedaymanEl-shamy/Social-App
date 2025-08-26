import { Button, Input } from '@heroui/react';
import {  Link  } from 'react-router-dom';
import { useLogin } from '../../hooks/useLogin';
import { Helmet } from 'react-helmet';





export default function Login() {
 
         const {isLoading,handleSubmit,register,errors,handleLogin,shceme} = useLogin()

  return (
      <>
      <Helmet>
        <title>Lokapp-Log in or sign up</title>
      </Helmet>
<div className='h-screen'>
     <div className='max-w-xl bg-white py-10 shadow-2xl mx-auto my-10 px-5 rounded-2xl mt-30'>
      <form onSubmit={handleSubmit(handleLogin)}>
        <div className='flex flex-col gap-6'>
          <h1 className='text-center font-semibold '>Login Page</h1>
          <Input   isInvalid={Boolean(errors.email?.message)}  errorMessage={errors.email?.message}  variant='bordered' label="Email" type="email" {...register('email')} />
          <Input autoComplete='true' isInvalid={Boolean(errors.password?.message)}  errorMessage={errors.password?.message}  variant='bordered' label="Password" type="password" {...register('password')} />
             <p className='font-semibold'>Don't have account ? <Link to={'/register'} className='text-blue-500 font-semibold underline'>Creat an account</Link></p>
          <Button isLoading={isLoading} type='submit' color="primary" variant="bordered">
            Submit
          </Button>
        </div>
      </form>

    </div>
</div>
</>
  )
}
