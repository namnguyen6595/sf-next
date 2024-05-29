import api from "@/lib/axios";
import { logger } from "@/logger";
import { Skeleton } from "antd";
import dynamic from "next/dynamic";
const DetailPageUI = dynamic(() => import("@/modules/posts"), {
  loading: () => <Skeleton />,
  ssr: false
})
const fetchDataPost = async (id: number) => {
  const response = await api.get(`/api/post/${id}`);
  return {
    success: true,
    data: response.data.data,
  };
};

const PageDetail: React.FC<{ params: { id: number } }> = async (props) => {
  const {
    params: { id },
  } = props;

  const response = await fetchDataPost(id);
  logger.debug({ response });
  return (
    <div className="container mx-auto">
      {!!response.data && <DetailPageUI id={id} post={response.data} />}
    </div>
  );
};

export default PageDetail;
