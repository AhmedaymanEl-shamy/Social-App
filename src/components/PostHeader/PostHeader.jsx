import { Ellipsis, LoaderCircle, Pencil, SendHorizontal, Trash } from 'lucide-react'
import useraltimage from '../../assets/icon-7797704_640.png'
import { Dropdown, DropdownItem } from 'flowbite-react'
import CreatePost from '../CreatePost/CreatePost';
import { usePostHeader } from '../../hooks/usePostHeader';
import moment from 'moment/moment';
export default function PostHeader({name,photo,createdAt,comment,id,postId,commentId,postInfo,postImg}) {
    const{
    userId,
    handleCommnetUpdateInput,
    handleCloseCommnetUpdateInput,
    DeletePostMutate,
    deleteCommentMutate,
    commentUpdateMutate,
    isPending,commentUpdate,commentInput,isEdite,setIsEdite} = usePostHeader(commentId,postId)
  return (
        <>
          {comment && commentUpdate && <div className="relative">
            <div className='mb-1'><p className='font-semibold'>Update comment</p></div>
                <div className='flex relative'> <input ref={commentInput}  defaultValue={comment} type="search" id="default-search" className="commentInput" placeholder="Update comment..."  />
             <button onClick={commentUpdateMutate} type="submit" className="commentButton">{isPending ? <LoaderCircle size={20}color='#ffffff' />: <SendHorizontal size={20} color="#ffffff" strokeWidth={3} />}</button>
            </div>
            <div className='flex justify-end items-center pe-2'><p onClick={handleCloseCommnetUpdateInput} className='text-small text-red-500 underline cursor-pointer'>Cancel update</p></div>
    </div>}
   
    
          {isEdite?<div className='mb-10'><CreatePost postInfo={postInfo} postImg={postImg} postId={postId}  updating={true}/></div>:''}
        <div className={`${comment ? 'bg-gray-200 rounded-2xl p-3':''}`}>
                <div className="post-header flex justify-between items-center">
          <div className="left-part flex gap-2 items-center">
            <img  onError={(e)=>{e.target.src=useraltimage}} src={photo} className='w-16 h-16 rounded-full' alt={name} />
            <div className='info'>
              <h3 className='font-semibold text-lg'>{name}</h3>
              <h4 className='text-slate-500'>{moment(createdAt).startOf('minute').fromNow()}</h4>
            </div>
          </div>
          <div className="right-part mb-5">

           {userId==id ?    <Dropdown  dismissOnClick={false} renderTrigger={() => <span><Ellipsis/></span>}>
      <DropdownItem onClick={comment ? handleCommnetUpdateInput:()=>{setIsEdite(!isEdite)}} className='group/first'>Edite <span className='ps-2'><Pencil className='group-hover/first:fill-slate-400' size={20}/></span></DropdownItem>
      <DropdownItem onClick={comment ? deleteCommentMutate : DeletePostMutate} className='hover:text-red-500 group/sec'>Delete<span className='ps-2'><Trash className='group-hover/sec:fill-red-200' size={20}/></span></DropdownItem>
  
    </Dropdown>:''}

          </div>
        </div>  
        {comment && <p className='ms-18'>{comment}</p>}
        </div>
        </>
  )
}
