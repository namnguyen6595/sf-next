import { PostFilter } from "@/modules/posts/constant";
import { logger } from "@/logger";

const fetchDataPostes = async (filter: PostFilter) => {
  return {
    success: true,
  };
};

const AllPostPage: React.FC<{
  searchParams: { [key: string]: string };
}> = async ({ searchParams }) => {
  const filter: PostFilter = {} as PostFilter;
  Object.assign(filter, searchParams);

  const response = await fetchDataPostes(filter);
  return <div></div>;
};

export default AllPostPage;
