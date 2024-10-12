'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import './globals.css'

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	const router = useRouter()
	const [isJump, setIsJump] = useState(false)
	useEffect(() => {
		if (typeof window !== 'undefined') {
			// 在客户端渲染时才执行以下代码
			let isLogin = localStorage.getItem('isLogin')
			if (isLogin !== 'true') {
				router.push('/login')
			}
			setIsJump(true)
		}
	}, [])

	return (
		<html lang="zh">
			<body>
				{isJump && (
					<div>
						<main>{children}</main>
					</div>
				)}
			</body>
		</html>
	)
}
