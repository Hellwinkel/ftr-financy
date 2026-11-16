import { AppLayout } from '@/layouts/app-layout'
import { AuthLayout } from '@/layouts/auth-layout'
import { Dashboard } from '@/pages/dashboard'
import { Login } from '@/pages/login'
import { useAuthStore } from '@/stores/auth'

export function HomeRoute() {
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

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
