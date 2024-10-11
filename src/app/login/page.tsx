"use client";
import type { FormProps } from "antd";
import { Button, Checkbox, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

export default function Login() {
  const router = useRouter();

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
    router.push("/home");
    localStorage.setItem("loginInfor", JSON.stringify(values));
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="login flex justify-center items-center">
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 800 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="mt-40"
      >
        <Form.Item<FieldType>
          label="用户名"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input placeholder="请输入你的注册的邮箱地址" />
        </Form.Item>

        <Form.Item<FieldType>
          label="密码"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password placeholder="请输入你的密码" />
        </Form.Item>

        <Form.Item<FieldType>
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>记住我</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" className="mr-8">
            登录
          </Button>
          <Button type="primary" htmlType="submit">
            注册
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
