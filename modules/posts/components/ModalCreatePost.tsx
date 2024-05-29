"use client"

import React, { useEffect, useState } from "react";
import { Form, Input, Modal, DatePicker, InputNumber, Button } from "antd";
import { ICreatePostProps, PostBody } from "@/modules/posts/constant";
import useTranslation from "@/hooks/useTranslation";
import TextEditor from "@/components/Shared/TextEditor";
import api from "@/lib/axios";

const { TextArea } = Input;
const { RangePicker } = DatePicker

const layout = {};

const ModalCreatePost: React.FC<ICreatePostProps> = (props) => {
    const { open, setOpen, onSubmit } = props;
    const [form] = Form.useForm<PostBody>();
    const { t } = useTranslation()
    const [postInfo, setPostInfo] = useState<PostBody>({} as PostBody)
    const handleSubmit = async () => {
        form.validateFields().then((values) => {
            console.debug({ values })
            setPostInfo(values)
        })
        let data = form.getFieldsValue()
        const response = await api.post('/api/posts', data)

        if (response.status === 201) {
            onSubmit(data)
            // setOpen(false)
        }
    }

    const handleChangePostContent = (content: string) => {
        console.debug({ content })
        form.setFieldsValue({ description: content })
    }
    return <Modal
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
    >
        <h1 className="text-2xl font-medium mb-4">{t("posts.button.create_new_post")}</h1>
        <Form {...layout} layout={"vertical"} form={form}>
            <Form.Item
                name="name"
                label={t('posts.form.title')}
                rules={[{ required: true, message: t('posts.form.please_enter_post_title') }]}
                initialValue={postInfo.title}
            >
                <Input type="text" />
            </Form.Item>
            <Form.Item
                name="fee"
                label={t('posts.form.fee')}
                rules={[{ required: true, message: t('posts.form.please_enter_fee') }]}
                initialValue={70000}
            >
                <InputNumber<number>
                    defaultValue={70}
                    formatter={(value) => `${value ? value : value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={(value) => value?.replace(/\$\s?|(,*)/g, '') as unknown as number}
                    // onChange={onChange}
                    addonAfter={"VND"}
                />
            </Form.Item>
            <Form.Item
                name="time"
                label={t('posts.form.time')}
                initialValue={postInfo.time}
                rules={[{ required: true, message: t('posts.form.please_select_time_range') }]}
            >
                <RangePicker showTime format={"HH:mm DD/MM"} />
            </Form.Item>
            <Form.Item
                name="description"
                label={t('posts.form.description')}
                rules={[{ required: true, message: t('posts.form.please_enter_description') }]}
                initialValue={postInfo.description}
            >
                <TextEditor
                    initialValue={postInfo.description}
                    onChange={handleChangePostContent}
                />
            </Form.Item>
            <div className="flex justify-end items-center">
                <div className="flex gap-2">
                    <Button onClick={() => setOpen(false)}>{t("common.button.cancel")}</Button>
                    <Button type="primary" onClick={handleSubmit}>{t("common.button.submit")}</Button>
                </div>
            </div>
        </Form>
    </Modal>
}

export default ModalCreatePost