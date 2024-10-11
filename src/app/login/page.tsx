'use client'
import type { FormProps } from 'antd'
import { Button, Checkbox, Form, Input, message } from 'antd'
import { NoticeType } from 'antd/es/message/interface'
import { useRouter } from 'next/navigation'

type FieldType = {
	username?: string
	password?: string
	remember?: string
}

const validateMessages = {
	required: '${label} 是必填!',
	types: {
		email: '请输入一个有效的邮箱',
	},
}

export default function Login() {
	const router = useRouter()
	const [messageApi, contextHolder] = message.useMessage()
	const myMessage = (type: NoticeType, tips: string) => {
		messageApi.open({
			type: type,
			content: tips,
		})
	}
	const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
		console.log(localStorage.getItem('loginInfor'))

		let loginInfor: FieldType = localStorage.getItem('loginInfor')
			? JSON.parse(localStorage.getItem('loginInfor') as string)
			: {}
		if (loginInfor.username == values.username) {
			if (loginInfor.password == values.password) {
				myMessage('success', '登录成功')
				localStorage.setItem('isLogin', 'true')
				router.push('/page1/home')
			} else {
				myMessage('warning', '密码错误')
			}
		} else {
			myMessage('warning', '用户名不存在，请先注册')
		}
	}

	const handleRegister = () => {
		router.push('/register')
	}

	return (
		<div className="login flex items-center justify-center">
			{contextHolder}
			<Form
				name="basic"
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 16 }}
				style={{ maxWidth: 800 }}
				initialValues={{ remember: true }}
				onFinish={onFinish}
				autoComplete="off"
				validateMessages={validateMessages}
				className="mt-40">
				<Form.Item<FieldType>
					label="用户名"
					name="username"
					rules={[
						{
							type: 'email',
							required: true,
						},
					]}>
					<Input placeholder="请输入你的注册的邮箱地址" />
				</Form.Item>

				<Form.Item<FieldType>
					label="密码"
					name="password"
					rules={[{ required: true, message: '请输入你的密码!' }]}>
					<Input.Password placeholder="请输入你的密码" />
				</Form.Item>

				<Form.Item<FieldType>
					name="remember"
					valuePropName="checked"
					wrapperCol={{ offset: 8, span: 16 }}>
					<Checkbox>记住我</Checkbox>
				</Form.Item>

				<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
					<Button type="primary" htmlType="submit" className="mr-8">
						登录
					</Button>
					<Button type="primary" onClick={handleRegister}>
						注册
					</Button>
				</Form.Item>
			</Form>
		</div>
	)
}
