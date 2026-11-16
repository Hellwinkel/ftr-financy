import type { ReactNode } from 'react'
import { Navigate, Route, Routes } from 'react-router'
import { AppLayout } from '@/layouts/app-layout'
import { AuthLayout } from '@/layouts/auth-layout'
import { Categories } from '@/pages/categories'
import { Profile } from '@/pages/profile'
import { Signup } from '@/pages/signup'
import { Transactions } from '@/pages/transactions'
import { useAuthStore } from '@/stores/auth'
import { HomeRoute } from './home-route'

function ProtectedRoute({ children }: { children: ReactNode }) {
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

	return isAuthenticated ? children : <Navigate to="/" replace />
}

function PublicRoute({ children }: { children: ReactNode }) {
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

	return !isAuthenticated ? children : <Navigate to="/" replace />
}

export function AppRoutes() {
	return (
		<Routes>
			<Route index element={<HomeRoute />} />

			<Route
				element={
					<PublicRoute>
						<AuthLayout />
					</PublicRoute>
				}
			>
				<Route path="cadastro" element={<Signup />} />
			</Route>

			<Route
				element={
					<ProtectedRoute>
						<AppLayout />
					</ProtectedRoute>
				}
			>
				<Route path="perfil" element={<Profile />} />
				<Route path="transacoes" element={<Transactions />} />
				<Route path="categorias" element={<Categories />} />
			</Route>

			<Route path="*" element={<Navigate to="/" replace />} />
		</Routes>
	)
}
