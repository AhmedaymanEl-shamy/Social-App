import { Button } from '@heroui/react'
import { ImageUp, X } from 'lucide-react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useCreatPost } from '../../hooks/useCreatPost'


export default function CreatePost({updating,postInfo,postId}) {
                   
            const{ modalOpen,
                setModalOpen,
                image,
                setImage,
                data,
                isError,
                isLoading,
                handleModalOpen,
                handleCloseOpen,
                handleImage,
                mutate,
                handleUpdateMutate,
                bodyInput,
                imageInput,
            imagFile,setImageFile,caption,setCaption,createTest,imagePreview,setImagePreview,creatPosts} = useCreatPost(postId)

          
                function handleImageInput(e){
                 if(e.target.files[0]){
                       setImageFile(e.target.files[0]);
                        setImagePreview(URL.createObjectURL(e.target.files[0]))
                       
                 }
                    
                }

                function handleCancelImage(){
                    setImageFile(null)
                    setImagePreview("")
                    
                }

    return (
        
        <div className='bg-white p-3 rounded-xl space-y-4'>
                {updating ? <h2 className='font-semibold text-large text-slate-700'>Update post</h2>:<h2 className='font-semibold text-large text-slate-700'>Post somthing</h2>}
                    <form onSubmit={createTest}>
            <div className='space-y-4'>
               <div onClick={handleModalOpen} className='flex justify-center items-center'>
                {!updating&& <div className='pe-1'>{isLoading ? <div ><Skeleton circle={true} height={50} width={50}  baseColor='#ddd'/></div>:<img className='lg:w-16 lg:h-13  w-20 h-12 rounded-full' src={data?.data.user.photo} alt="user image" />}
               </div>}
                {updating? <input ref={bodyInput} defaultValue={postInfo} className="commentInput" placeholder="....." />:<input value={caption} onChange={(e)=> setCaption(e.target.value)}  className="commentInput" placeholder="Whats's on your mind?" />}
                   <label> <input onChange={handleImageInput} type="file" className='hidden' />
                    <div className='flex space-x-2 ps-2'><ImageUp size={40} color='#1c64f2' />

                    </div>

                </label>
                </div>
                
                {imagePreview && <div className='relative flex justify-center items-center'>
                    <img className='rounded-2xl  w-80  object-contain' src={imagePreview} alt="post photo" />
                    <div onClick={handleCancelImage} className='absolute cursor-pointer top-3 right-3 p-1 text-white bg-red-500 rounded-2xl'>
                        <X />
                    </div>
                </div>}


                {modalOpen &&  <div className='flex justify-end space-x-4 pe-5'>
                    <Button onPress={handleCloseOpen} variant='ghost' color="danger">Cancel</Button>
                   {updating ? <Button onPress={handleUpdateMutate} variant='ghost' color="primary">Update</Button>: <Button onPress={mutate}  variant='ghost' color="primary">Post</Button>}
 
                </div>}
            </div>
            </form>
        </div>
    )
}
