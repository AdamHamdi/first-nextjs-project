
"use client"
import React, { useEffect, useState } from 'react';

interface Post {
  userId?: number;
  id?: number;
  title?: string;
  body?: string;
  completed?: boolean;
}

interface PostDetailProps {
  params: { postId: number };
}

const PostDetails: React.FC<PostDetailProps> = ({ params }) => {
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    // Fetch the post details using an API or any other method
    const fetchPostDetails = async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.postId}`,
        {
          next:{
            revalidate:120
          }
        });
        if (response.ok) {
          const postData: Post = await response.json();
          setPost(postData);
        } else {
          console.error(`Failed to fetch post details. Status: ${response.status}`);
        }
      } catch (error) {
        console.error('Error fetching post details:', error);
      }
    };

    fetchPostDetails();
  }, [params.postId]);

  return (
    <div className='p-5'>
     
      {post ? (
        <div className='post-block'>
          <h2 className='font-bold'>{post.id} - {post.title}</h2>
          <p>{post.body}</p>
          {/* Add more details if needed */}
        </div>
      ) : (
        <p className='text-white'>Loading post details...</p>
      )}
    </div>
  );
};

export default PostDetails;
