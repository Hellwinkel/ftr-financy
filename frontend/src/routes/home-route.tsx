import { AppLayout } from '@/layouts/app-layout'
import { AuthLayout } from '@/layouts/auth-layout'
import { Dashboard } from '@/pages/dashboard'
import { Login } from '@/pages/login'

export function HomeRoute() {
	// TODO: substituir pelo store
	const isAuthenticated = true

	return isAuthenticated ? (
		<AppLayout>
			<Dashboard />
		</AppLayout>
	) : (
		<AuthLayout>
			<Login />
		</AuthLayout>
	)
}
