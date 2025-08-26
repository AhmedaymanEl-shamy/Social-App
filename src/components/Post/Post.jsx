import { Forward, Heart, LoaderCircle, MessageCircle, SendHorizontal } from 'lucide-react'
import { Link } from 'react-router-dom'
import PostHeader from '../PostHeader/PostHeader'
import { usePost } from '../../hooks/usePost'

export default function Post({post,inSinglPage}) {
const {user,posyHasImage,firstComment,mutate,isPending,commentInput,felUpdate} = usePost(post)

  return (
    
  <div className='bg-white rounded-xl p-6 space-y-5'>
          <PostHeader postInfo={post.body} postImg={post.image} commentId={null} postId={post.id} id={user._id} name={user.name} photo={user.photo} createdAt={post.createdAt} comment={null}/>
        <div className="post-body">
          <p className='mb-2'>{post.body}</p>
          {posyHasImage && <img src={post.image} className='w-full block' alt="" />}
        </div>
        <div className="post-footer flex justify-between items-center py-2 ">
          <div className='flex  cursor-pointer  group hover:bg-gray-300   rounded-2xl '>
            <Heart className='group-hover:fill-red-500 space-x-12 group-hover:text-red-500' />
            <h5>like</h5>
          </div>
          <Link to={`/postdeatils/${post.id}`} className='flex  cursor-pointer   hover:bg-gray-300    rounded-2xl'>
            <MessageCircle />
            <h5>{post.comments.length}  comment</h5>
          </Link>
          <div className='flex  cursor-pointer  hover:bg-gray-300   rounded-2xl'>
            <Forward />
            <h5>share</h5>
          </div>
        </div>
          
          
          {!felUpdate && <div className="relative">
   
        <input ref={commentInput} type="search" id="default-search" className="commentInput" placeholder="create comment..."  />
        <button disabled={isPending}  onClick={mutate}  type="submit" className="commentButton">{isPending ? <LoaderCircle size={20}color='#ffffff' />:<SendHorizontal size={20} color="#ffffff" strokeWidth={3} />}</button>
    </div>}



          {inSinglPage && post.comments.map((comment)=><PostHeader commentId={comment._id} id={comment.commentCreator._id} key={comment._id} name={comment.commentCreator.name} photo={comment.commentCreator.photo} createdAt={comment.createdAt} comment={comment.content}/>).reverse()}
          {!inSinglPage && firstComment && <PostHeader commentId={firstComment._id} id={firstComment.commentCreator._id} name={firstComment.commentCreator.name} photo={firstComment.commentCreator.photo} createdAt={firstComment.createdAt} comment={firstComment.content}/>
   }
 
        
      </div>
  )
}




