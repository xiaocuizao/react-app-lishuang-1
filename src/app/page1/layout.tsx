import Link from 'next/link'
export default function pageLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<div>
			<div className="text-blue-500">
				<Link href="/page1/home" className="mr-2">
					首页
				</Link>
				<Link href="/page1/about">关于</Link>
			</div>
			{children}
		</div>
	)
}
