import type { ReactNode } from 'react'
import { Outlet } from 'react-router'
import { Navbar } from '@/components/navbar'

export function AppLayout({ children }: { children?: ReactNode }) {
	return (
		<div className="min-h-screen bg-gray-100">
			<Navbar />
			<main className="w-11/12 max-w-7xl mx-auto py-12">{children ?? <Outlet />}</main>
		</div>
	)
}
