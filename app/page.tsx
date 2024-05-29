import { PostItem } from "@/modules/posts/constant";
// import HomePageUI from "@/modules/home";
import api from "@/lib/axios";
import dynamic from "next/dynamic";
import { NextPageContext } from "next";
import { logger } from "@/logger";
const HomePageUI = dynamic(() => import("@/modules/home"), {
  ssr: false,
});

const fetchPostData = async () => {
  const response = await api.get("/themes/post?trending=true&page=1&limit=5");
  //@ts-ignore
  if (response.success) {
    return {
      success: true,
      data: response.data.data,
    };
  }
};

export default async function Home(props: { context: NextPageContext }) {
  const response = await fetchPostData();
  const data: {
    post: PostItem[];
  } = {
    post: [],
  };
  if (response?.success) {
    response.data.forEach((post: any) => {
      const postData: PostItem = {
        title: post.name,
        id: post.id,
        author: post.user.first_name + " " + post.user.last_name,
        created_at: post.created_at,
        rating: 0,
        description: post.description,
      };

      data.post.push(postData);
    });
  }
  return <HomePageUI posts={data.post} />;
}
