import { Link, useNavigate } from 'react-router-dom';
import { Button, Input, Select, SelectItem } from '@heroui/react';
import { useRegister } from '../../hooks/useRegister';
import { Helmet } from 'react-helmet';



export default function Register() {
      const {isLoading,handleSubmit,register,errors,handleRegister,} = useRegister()

  return (
    <>
     <Helmet>
        <title> Sign up for Lokapp</title>
      </Helmet>
    <div className='h-screen'>
    <div className='max-w-xl py-10 bg-white shadow-2xl mx-auto my-10 px-5 rounded-2xl'>
      <form onSubmit={handleSubmit(handleRegister)}>
        <div className='flex flex-col gap-6'>
          <h1 className='text-center font-semibold '>Register Page</h1>
          <Input  isInvalid={Boolean(errors.name?.message)}  errorMessage={errors.name?.message} variant='bordered' label="Name" type="name" {...register('name')} />
          <Input  isInvalid={Boolean(errors.email?.message)}  errorMessage={errors.email?.message}  variant='bordered' label="Email" type="email" {...register('email')} />
          <Input autoComplete='true' isInvalid={Boolean(errors.password?.message)}  errorMessage={errors.password?.message}  variant='bordered' label="Password" type="password" {...register('password')} />
          <Input autoComplete='true' isInvalid={Boolean(errors.rePassword?.message)}  errorMessage={errors.rePassword?.message}  variant='bordered' label="Confirm Password" type="password" {...register('rePassword')} />
          <Input  isInvalid={Boolean(errors.dateOfBirth?.message)}  errorMessage={errors.dateOfBirth?.message}  variant='bordered' label="date Of Birth" type="date" {...register('dateOfBirth')} />
          <Select isInvalid={Boolean(errors.gender?.message)}  errorMessage={errors.gender?.message}  variant='bordered' label="Select your gender" {...register('gender')}>
            <SelectItem key={"male"}>Male</SelectItem>
            <SelectItem key={"female"}>Female</SelectItem>
          </Select>
          <p className='font-semibold'>already have an account ? <Link to={'/login'} className='text-blue-500 font-semibold underline'>Login</Link></p>
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
