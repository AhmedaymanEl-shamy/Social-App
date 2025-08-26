import Post from '../../components/Post/Post'
import Skeleton from 'react-loading-skeleton'
import { usePostDeatails } from '../../hooks/usePostDeatails'


export default function PostDeatails() {
  const { data,error,isError,isLoading} = usePostDeatails()

   if(isLoading){
    return <div className='p-10 mx-auto  w-3xl'>
                 <Skeleton className='h-160 my-4' borderRadius={20} baseColor='#dddd' />
              </div>
   }
   
   if(isError){
  
    return <h2>{error.message}</h2>

   }
  
   
  return (
 <>
     <div className='p-10 mx-auto w-3xl space-y-6'>
        <Post post={data.data.post} inSinglPage={true}/>
        </div>
 </>
  )
}
