import { Link, NavLink } from 'react-router'
import logo from '@/assets/logo.svg'
import { getInitials } from '@/lib/format'
import { useAuthStore } from '@/stores/auth'
import { Avatar, AvatarFallback } from './ui/avatar'

export function Navbar() {
	const user = useAuthStore((state) => state.user)

	return (
		<header className="bg-white border-b border-gray-200 ">
			<div className="w-11/12 max-w-7xl mx-auto py-4 grid grid-cols-[1fr_auto_1fr] gap-4 items-center">
				<Link to="/" className="w-fit">
					<img src={logo} alt="Financy" width={134} height={32} className="h-6" />
				</Link>

				<nav className="justify-self-center">
					<ul className="flex items-center gap-5">
						<li>
							<NavLink to="/" end data-label="Dashboard" className="nav-link">
								Dashboard
							</NavLink>
						</li>
						<li>
							<NavLink to="/transacoes" data-label="Transações" className="nav-link">
								Transações
							</NavLink>
						</li>
						<li>
							<NavLink to="/categorias" data-label="Categorias" className="nav-link">
								Categorias
							</NavLink>
						</li>
					</ul>
				</nav>

				<Link to="/perfil" className="justify-self-end" title="Editar perfil">
					<Avatar>
						<AvatarFallback>{getInitials(user?.name ?? '')}</AvatarFallback>
					</Avatar>
				</Link>
			</div>
		</header>
	)
}
