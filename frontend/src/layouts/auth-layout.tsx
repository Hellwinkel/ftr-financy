import type { ReactNode } from 'react'
import { Outlet } from 'react-router'
import logo from '@/assets/logo.svg'

export function AuthLayout({ children }: { children?: ReactNode }) {
	return (
		<main className="min-h-screen bg-gray-100 py-12 flex flex-col items-center gap-8">
			<img src={logo} alt="Financy" width={134} height={32} className="h-8" />
			{children ?? <Outlet />}
		</main>
	)
}
