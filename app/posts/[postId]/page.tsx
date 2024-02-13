
 
import PostDetails from '@/app/component/post-detail';
import { Suspense } from 'react';
 
interface PostDetailProps {
  params: { postId: number };
}

const PostDetailsPage: React.FC<PostDetailProps> = ({ params }) => {
   const loader=(
    <div className="h-100">
        <div className="loader">
            Loading ...
        </div>
    </div>
)

  return (
    <div className='p-5'>
      <h1 className='text-white'>Post Detail</h1>
      <Suspense fallback={loader}>
      <PostDetails params={{ postId: params.postId }} />
      </Suspense>
    </div>
  );
};

export default PostDetailsPage;
