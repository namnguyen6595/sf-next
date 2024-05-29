"use client";

import useTranslation from "@/hooks/useTranslation";
import { HotPostProps } from "../constant";
import { formatDateByFormat } from "@/utils/string";
import { formatDistance } from "date-fns";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import _ from "lodash";

const HotPostUI: React.FC<HotPostProps> = (props) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { post } = props;
  const goToDetail = () => {
    router.push(`/posts/${post.id}`);
  };
  const isEmptyData = useMemo(() => {
    return _.isEmpty(post);
  }, [post])
  return (
    <div>
      <h1 className="lg:container lg:mx-auto font-bold text-4xl mb-4">
        {t("posts.latest")}
      </h1>
      {isEmptyData ? <div></div> : <div className="px-6">
        <img
          src="https://www.completesports.com/wp-content/uploads/Badminton.jpg"
          alt=""
          className="mb-3"
        />
        <div className="flex gap-2 items-center">
          <p className="text-sm">
            {t("posts.post_by")}{" "}
            <span className="text-red-400">{post.author}</span>
          </p>
          <p className="text-sm">
            <span>
              {formatDistance(new Date(), new Date(post.created_at), {
                addSuffix: true,
              })}
            </span>
          </p>
        </div>

        {/* Content of posts */}
        <div className="mb-4">
          <h1 className="text-lg font-semibold mb-1">{post.title}</h1>
          <p className="text-slate-400">{post.description}</p>
        </div>
        <button
          className="bg-red-400 px-2 py-1 rounded-md text-white"
          onClick={goToDetail}
        >
          {t("common.button.read_more")}
        </button>
      </div>}
    </div>
  );
};

export default HotPostUI;
