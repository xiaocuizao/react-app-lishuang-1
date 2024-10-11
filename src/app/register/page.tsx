'use client'
import type { FormProps } from 'antd'
import { Button, Col, Form, Input, Progress, Row, message } from 'antd'
import { NoticeType } from 'antd/es/message/interface'
import { useRouter } from 'next/navigation'
import zxcvbn from 'zxcvbn'
import './index.css'

type FieldType = {
	username?: string
	password?: string
	confirm?: string
}

type CallbackType = () => void

export default function Register() {
	const router = useRouter()
	const [messageApi, contextHolder] = message.useMessage()
	const [form] = Form.useForm<{
		username: string
		password: string
		confirm: string
	}>()
	// 监听密码的改变
	const password = Form.useWatch('password', form)
	const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
		myMessage('success', '注册成功')
		localStorage.setItem('loginInfor', JSON.stringify(values))
		setTimeout(() => {
			router.push('/login')
		}, 1000)
	}

	const watchStrength = (password: string): number => {
		const analysisValue = zxcvbn(password)
		// score得分只有0~4，且只有整数范围并没有小数
		return (analysisValue.score + 1) * 20
	}

	const myMessage = (type: NoticeType, tips: string) => {
		messageApi.open({
			type: type,
			content: tips,
		})
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
				form={form}
				autoComplete="off"
				className="mt-40">
				<Form.Item<FieldType>
					label="用户名"
					name="username"
					rules={[
						{
							type: 'email',
							message: 'The input is not valid E-mail!',
						},
						{
							required: true,
							message: 'Please input your E-mail!',
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
				<Form.Item
					name="confirm"
					label="确定密码"
					dependencies={['password']}
					hasFeedback
					rules={[
						{
							required: true,
							message: 'Please confirm your password!',
						},
						({ getFieldValue }) => ({
							validator(_, value) {
								if (!value || getFieldValue('password') === value) {
									return Promise.resolve()
								}
								return Promise.reject(
									new Error('The new password that you entered do not match!')
								)
							},
						}),
					]}>
					<Input.Password />
				</Form.Item>

				<Progress
					percent={password ? watchStrength(password) : 0}
					steps={5}
					strokeColor={['#e74242', '#EFBD47', '#ffa500', '#1bbf1b', '#008000']}
					showInfo={false}
				/>
				<Row justify="space-around">
					{['非常弱', '弱', '一般', '强', '非常强'].map((value) => (
						<Col span={4} key={value}>
							{value}{' '}
						</Col>
					))}
				</Row>
				<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
					<Button type="primary" htmlType="submit">
						注册
					</Button>
				</Form.Item>
			</Form>
		</div>
	)
}
