import type { ReactNode } from "react";
import type { Metadata } from "next";
import type { JsonPlaceholderPost } from "@/types/json-placeholder";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ postId: string }>;
}): Promise<Metadata> => {
  const { postId } = await params;

  const post = (await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`
  ).then((res) => res.json())) as JsonPlaceholderPost;
  console.log(post);

  return {
    title: `${post.title} | OZ-NEXT`,
    description: post.body,
    openGraph: {
      title: `${post.title} | OZ-NEXT`,
      description: post.body,
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaRSfi3nwGMPDc0k5XH01YbIYiNk00kMC2P-udBk8VApmuvbK45WduyEbUCrpvFdqAIgKSIAJvUr-HtGLsy85onEvN9lvi2gKpUDAXcz0c&s=10",
      ],
    },
  };
};

const PostLayout = ({ children }: { children: ReactNode }) => {
  return <div>{children}</div>;
};

export default PostLayout;