import Link from 'next/link'
export default function pageLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<div>
			<div className="text-blue-500">
				<Link href="/home" className="mr-2">
					首页
				</Link>
				<Link href="/about">关于</Link>
			</div>
			{children}
		</div>
	)
}
