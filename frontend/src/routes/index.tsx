import { Navigate, Route, Routes } from 'react-router'
import { AppLayout } from '@/layouts/app-layout'
import { AuthLayout } from '@/layouts/auth-layout'
import { Categories } from '@/pages/categories'
import { Profile } from '@/pages/profile'
import { Signup } from '@/pages/signup'
import { Transactions } from '@/pages/transactions'
import { HomeRoute } from './home-route'

export function AppRoutes() {
	return (
		<Routes>
			<Route index element={<HomeRoute />} />

			<Route element={<AuthLayout />}>
				<Route path="cadastro" element={<Signup />} />
			</Route>

			<Route element={<AppLayout />}>
				<Route path="perfil" element={<Profile />} />
				<Route path="transacoes" element={<Transactions />} />
				<Route path="categorias" element={<Categories />} />
			</Route>

			<Route path="*" element={<Navigate to="/" replace />} />
		</Routes>
	)
}
