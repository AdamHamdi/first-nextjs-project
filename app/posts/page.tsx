"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

interface Post {
  userId?: number;
  id?: number;
  title?: string;
  body?: string;
}

const fetchPosts= async() => {
   
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts',
        {
          next:{
            revalidate:120
          }
        });
        const postData = await response.json();
        console.log(postData);
         return postData
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
 
   export default async function Posts(){

   const posts : Post[] = await fetchPosts()

  return (
    <div>
      <div >
        <h1>Posts List</h1>
        <ul>
          {posts.map(post => (
            <li className="post-block" key={post.id}>
              <Link className='font-bold' rel="stylesheet" href={`/posts/${post.id}`} >
            <u> {post.id} - {post.title}</u> 
              </Link> 
              <p className='text-gray-500'>{post.body}</p>
              </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
