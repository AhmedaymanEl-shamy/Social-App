import { Button, Input } from '@heroui/react';
import { useChangePassword } from '../../hooks/useChangePassword';


export default function ChangePassword({setopenform}) {
    const {isLoading,handleSubmit,register,errors,mutate} = useChangePassword({setopenform})
  return (
    <div>
       <form onSubmit={handleSubmit(mutate)} className="flex max-w-md text-center flex-col gap-3">
         <label>
            <p>Current Password</p>
                <div className="block">
          <Input autoComplete='true' isInvalid={Boolean(errors.password?.message)}  errorMessage={errors.password?.message}  variant='bordered' label="currentPassword" type="password" {...register('password')} />
        </div>
        </label>
      <div>
        <label>
            <p>New Password</p>
                <div className="block">
          <Input autoComplete='true' isInvalid={Boolean(errors.newPassword?.message)}  errorMessage={errors.newPassword?.message}  variant='bordered' label="New password" type="password" {...register('newPassword')} />
        </div>
        </label>
        
      </div>
        <Button isLoading={isLoading} type='submit' color="primary" variant="bordered">
            Submit
          </Button>
      <div onClick={()=>setopenform(null)} className="flex items-center justify-center gap-2">
       
        <span className='text-red-400 cursor-pointer underline'>Cancel change ?</span>
      </div>
    </form>
    </div>
  )
}
