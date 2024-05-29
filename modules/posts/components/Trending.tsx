"use client";
import Link from "next/link";
import { IPostProps, PostItem } from "../constant";
import TrendingItem from "./TrendingItem";
import useTranslation from "@/hooks/useTranslation";
import { useEffect } from "react";

const TrendingUI: React.FC<IPostProps> = (props) => {
  const { posts } = props;

  const { t } = useTranslation();

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-4xl w-auto mb-3">{t("posts.top")}</h1>
        <Link href="/posts">
          <p className="hover:underline hover:cursor-pointer text-sm font-medium">
            {t("posts.view_all")}
          </p>
        </Link>
      </div>

      <div>
        {posts.map((item: PostItem) => (
          <Link key={item.id} href={`/posts/${item.id}`}>
            <TrendingItem item={item} key={item.id} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TrendingUI;
