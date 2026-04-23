"use client";

import { useState, useEffect } from "react";
import type { JsonPlaceholderPost } from "@/types/json-placeholder";

const PostPage = () => {
  const [posts, setPosts] = useState<JsonPlaceholderPost[] | null>(null);
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const data = (await response.json()) as JsonPlaceholderPost[];
      setPosts(data);
    };
    fetchPosts();
  }, []);

  if (!posts) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
};

export default PostPage;