"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

interface Post {
  userId?: number;
  id?: number;
  title?: string;
  completed?: boolean;
}

export default function Posts() {
  const [postDetail, setPostDetail] = useState<Post[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts',
        {
          next:{
            revalidate:120
          }
        });
        const postData = await response.json();
        setPostDetail(postData);
        console.log(postData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
 
    fetchData();
  }, []);

  return (
    <div>
      <div >
        <h1>Posts List</h1>
        <ul>
          {Array.isArray(postDetail) && postDetail.map(post => (
            <li className="post-block" key={post.id}>
              <Link rel="stylesheet" href={`/posts/${post.id}`} >
              {post.id} - {post.title}
              </Link> </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
