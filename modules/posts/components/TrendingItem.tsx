"use client"

import { useMemo } from "react";
import { IPostItemProps } from "../constant";
import { format } from "date-fns";
import DividerVertical from "../../../components/Shared/DividerVertical";
import useTranslation from "@/hooks/useTranslation";
import { enUS, vi } from 'date-fns/locale'
const TrendingItem: React.FC<IPostItemProps> = (props) => {
  const { item } = props;
  const { created_at, title, author } = item;
  const { t, lang } = useTranslation()
  const timeCreatedAt = useMemo(() => {
    return format(new Date(created_at), "MMM dd, yyyy", { locale: lang === 'vi' ? vi : enUS });
  }, [created_at]);
  return (
    <div
      className="px-8 py-5 hover:cursor-pointer rounded post"
    >
      <div className="flex gap-1 mb-2 post-text items-center flex-wrap">
        <p>{t("posts.post_by")}</p>
        <p className="post-text__author">{author}</p>
        <DividerVertical />
        <p className="text-sm">{timeCreatedAt}</p>
      </div>
      <div>
        <h2 className="text-3xl font-bold">{title}</h2>
      </div>
    </div>
  );
};

export default TrendingItem;
