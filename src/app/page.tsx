'use client'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Home({ Component, pageProps }: AppProps) {
	const router = useRouter()
	useEffect(() => {
		if (router.asPath == '/') {
			router.push('/page1/home')
		}
	}, [router])

	return null
}
