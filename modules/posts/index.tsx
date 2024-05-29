"use client";

import DividerVertical from "@/components/Shared/DividerVertical";
import { format } from "date-fns";
import { useEffect, useMemo } from "react";
import useTranslation from "@/hooks/useTranslation";
import { Button, Col, Row } from "antd";
import { userRegister } from "./action";
import { UserSelector } from "../auth/userSlice";
import { useSelector } from "react-redux";
import TextEditor from "@/components/Shared/TextEditor";

const DetailPageUI: React.FC<{ id: number; post: any }> = (props) => {
    const { id, post } = props;
    const { t } = useTranslation();
    const userStore = useSelector(UserSelector)
    const timePostCreated = useMemo(() => {
        return format(new Date(post.post.created_at), "MMM dd, yyyy");
    }, [post]);
    const userRegisterPost = async () => {
        const data = await userRegister({ post_id: `${id}` });
        console.log({ data })
    }

    const currentUserIsowner = useMemo(() => {
        return post.post.user.id === userStore?.id
    }, [userStore, post.post.user])

    return (
        <>
            <div>
                <div className="flex justify-between items-center">
                    <h1 className="text-5xl font-bold mb-2">{post.post.name}</h1>
                </div>
                <div className="flex items-center gap-2 mb-4">
                    <p className="text-sm">
                        {t("posts.post_by")}:{" "}
                        {post.post.user.name}
                    </p>
                    <DividerVertical />
                    <p className="text-sm">{timePostCreated}</p>
                </div>
                <div className="">
                    <Row >
                        {/* eslint-disable-next-line react/jsx-no-undef */}
                        <Col span={18} className="p-3">
                            <TextEditor
                                initialValue={post.post.description}
                                onChange={() => { }}
                                disabled={true}
                            />
                        </Col>
                        <Col className="p-3" span={6}>
                            <div>
                                <p className="text-base">{t("posts.register")}</p>
                            </div>
                            <Row>
                                <Col span={20}>
                                    <p className="font-semibold whitespace-nowrap">{t("posts.total_register")}:</p>
                                </Col>
                                <Col span={4}>
                                    <p>{post.register_info.register_count}</p>
                                </Col>
                            </Row>
                            {!currentUserIsowner && <Button onClick={userRegisterPost} type="primary">{t("posts.button.register")}</Button>}
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    );
};

export default DetailPageUI;
