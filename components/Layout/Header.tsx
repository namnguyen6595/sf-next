"use client";

import Link from "next/link";
import { switchLocale, validateToken } from "./action";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import useTranslation from "@/hooks/useTranslation";
import { Button, Space, Switch } from "antd";
import { useEffect, useState } from "react";
import ModalCreatePost from "@/modules/posts/components/ModalCreatePost";
import { PostBody } from "@/modules/posts/constant";
import * as jwt_decode from 'jwt-decode';
import { updateUserInfo } from "@/modules/auth/userSlice";
import { useDispatch } from "react-redux";
import api from "@/lib/axios";
// import { store } from "@/lib/store";

const HeaderUI: React.FC<{ language: string }> = (props) => {
    const { language } = props;
    const { t } = useTranslation();
    const dispatch = useDispatch()
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [locale, setLocale] = useState(language || "vi");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [openModalCreate, setOpenModalCreate] = useState<boolean>(false);
    const handleLocaleChange = async () => {
        const newUrl = await switchLocale(pathname, searchParams);
        setLocale(newUrl.locale);
    };

    const fetchAuthenStatus = async () => {
        const userData = await validateToken()
        if (!!userData) {
            dispatch(updateUserInfo({ value: { user: userData } }))
        }
        const respone = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "api/homepage", {
            method: "GET",
        }).then((res) => res.json());

        setIsLoggedIn(respone.isAuthenicated);
    };

    useEffect(() => {
        fetchAuthenStatus();
    }, []);

    const handleLogout = async () => {
        window.location.href = "/logout"
    };

    const handleCreatePost = (data: PostBody) => {

    }

    return (
        <div
            className="py-4 px-10 layout-header flex justify-between items-center"
            id="nav-bar"
        >
            <Link href="/">
                <h1 >{t("common.header")}</h1>
            </Link>

            <div className="flex gap-2  items-center">
                <h1 className="hover:cursor-pointer hover:underline">
                    {t("common.about_us")}
                </h1>
                {!isLoggedIn ? (
                    <Link href="/sign-in">
                        <Button className="">
                            <h1 className=" text-black my-0">{t("common.sign_in")}</h1>
                        </Button>
                    </Link>
                ) : (
                    <Button onClick={handleLogout}>
                        <p>{t("auth.logout")}</p>
                    </Button>
                )}
                {isLoggedIn && <Button
                    type="primary"
                    onClick={() => setOpenModalCreate(true)}>
                    {t("posts.button.create_new_post")}
                </Button>}

                <Space direction="vertical">
                    <Switch
                        checkedChildren="VI"
                        unCheckedChildren="EN"
                        onChange={handleLocaleChange}
                        value={locale === "vi"}
                    />
                </Space>
            </div>

            <ModalCreatePost open={openModalCreate} setOpen={setOpenModalCreate} onSubmit={handleCreatePost} />
        </div>
    );
};

export default HeaderUI;
