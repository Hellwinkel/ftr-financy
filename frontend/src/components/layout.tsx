import type { ReactNode } from 'react'
import { Navbar } from './navbar'

export function Layout({ children }: { children: ReactNode }) {
	return (
		<div className="min-h-screen bg-gray-100">
			<Navbar />
			<main className="w-11/12 max-w-7xl mx-auto py-12">{children}</main>
		</div>
	)
}
