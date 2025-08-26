import Post from '../../components/Post/Post'
import CreatePost from '../../components/CreatePost/CreatePost'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useHome } from '../../hooks/useHome'
import { Helmet } from 'react-helmet';


export default function Home() {
   
         const {data,error,isError,isLoading} =  useHome()
      
    
        if(isError){
       
          
          return <h2>{error.message}</h2>
        }
  
  return (
    <>
    <Helmet>
        <title>Home Page</title>
      </Helmet>
    
  <div className=' p-10 mx-auto max-w-2xl space-y-6'>
        <CreatePost />
        
      {isLoading ? <div>
             <Skeleton className='h-100 my-4' borderRadius={20} baseColor='#dddd' count={8}/>
          </div>:data.data.posts.map((post)=> 
      <Post key={post._id}  post={post} inSinglPage={false}/>
      )
        }
        
  </div>

     
   
    </>
  )
}
