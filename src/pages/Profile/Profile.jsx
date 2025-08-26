import Post from '../../components/Post/Post'
import Skeleton from 'react-loading-skeleton'
import CreatePost from '../../components/CreatePost/CreatePost'
import { useProfile } from '../../hooks/useProfile'
import { Helmet } from 'react-helmet'
import ProfileCard from '../../components/ProfileCard/ProfileCard'


export default function Profile() {
          const {data,isError,isLoading,error,userData,openUserPhoto,setopenUserPhoto} = useProfile()
            
  if(isError){
      return <div >
               <h2>{error.message}</h2>
              </div>
  }
  return (
    <>
    {openUserPhoto&&<div onClick={(e)=>e.target==e.currentTarget?setopenUserPhoto(false):''} className='h-screen flex justify-center z-50 items-center w-full bg-black/50  absolute '><div className='bg-slate-200 '><img className='w-fit' src={userData?.data.user.photo} alt="" /></div></div>}
     {userData &&  <Helmet>
        <title>profile Page | {userData.data.user.name}</title>
      </Helmet>}
      <div className='flex justify-center '><ProfileCard isLoading={isLoading} setopenUserPhoto={setopenUserPhoto} userData={userData}/></div>
     <div className='min-h-screen p-3 mx-auto max-w-2xl space-y-6'>
      <CreatePost />
     {isLoading ?<div>
                 <Skeleton className='h-100 my-4' borderRadius={20} baseColor='#dddd' count={4}/>
              </div>:data?.data.posts.map((post)=> <Post key={post.id} post={post} isSinglePage={false}/>).reverse()}
     </div>
    </>
  )
}
