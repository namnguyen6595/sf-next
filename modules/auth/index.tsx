"use client";

import { Form, Checkbox, Button, FormProps, Input, Typography } from "antd";
import { FieldType, IAuthProps } from "./constant";
import { useRouter } from "next/navigation";
import { handleSignIn } from "./action";
import useTranslation from "@/hooks/useTranslation";
import Link from "next/link";
import { useState } from "react";

const { Text } = Typography

const AuthPage: React.FC = (props) => {
  const router = useRouter();
  const { t } = useTranslation()
  const [errorForm, setErrorForm] = useState<{ type: "danger" | "success" | "", message: string }>({
    type: "",
    message: ""
  })
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const response = await handleSignIn(values);
    if (response.success) {
      localStorage.setItem("access-token", response.data.access_token);
      window.location.href = "/";
      return
    }

    setErrorForm({
      type: 'danger',
      message: t("auth.error_sign_in")
    })
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        action={handleSignIn}
      >
        <Form.Item<FieldType>
          label={t("auth.email")}
          name="email"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label={t("auth.password")}
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>{t('auth.remember_me')}</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">
            {t('auth.sign_up')}
          </a>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            {t("common.button.sign_in")}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AuthPage;
