import { Skeleton } from "antd";
import dynamic from "next/dynamic";
import {PostItem} from "@/modules/posts/constant";

const HotPostUI = dynamic(() => import("@/modules/posts/components/HotPost"), {
  loading: () => <Skeleton />,
  ssr: false,
});

const TrendingUI = dynamic(() => import("@/modules/posts/components/Trending"), {
  loading: () => <Skeleton />,
  ssr: false,
});
interface IHomePageProps {
  posts: any;
}

const HomePageUI: React.FC<IHomePageProps> = (props) => {
  const { posts } = props;
  return (
    <>
      <div className="grid grid-cols-2">
        <HotPostUI post={posts[0]} />
        <TrendingUI posts={posts} />
      </div>
    </>
  );
};

export default HomePageUI;
