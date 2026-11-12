import { Link, NavLink } from 'react-router'
import logo from '@/assets/logo.svg'
import { Avatar, AvatarFallback } from './ui/avatar'

export function Navbar() {
	return (
		<header className="bg-white border-b border-gray-200 ">
			<div className="w-11/12 max-w-7xl mx-auto py-4 grid grid-cols-[1fr_auto_1fr] gap-4 items-center">
				<Link to="/" className="w-fit">
					<img src={logo} alt="Financy" width={134} height={32} className="h-6" />
				</Link>

				<nav className="justify-self-center">
					<ul className="flex items-center gap-5">
						<li>
							<NavLink
								to="/"
								end
								className="text-sm text-gray-600 hover:text-brand-dark aria-[current=page]:text-brand-base aria-[current=page]:font-semibold"
							>
								Dashboard
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/transacoes"
								className="text-sm text-gray-600 hover:text-brand-dark aria-[current=page]:text-brand-base aria-[current=page]:font-semibold"
							>
								Transações
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/categorias"
								className="text-sm text-gray-600 hover:text-brand-dark aria-[current=page]:text-brand-base aria-[current=page]:font-semibold"
							>
								Categorias
							</NavLink>
						</li>
					</ul>
				</nav>

				<Link to="/perfil" className="justify-self-end">
					<Avatar>
						<AvatarFallback>CT</AvatarFallback>
					</Avatar>
				</Link>
			</div>
		</header>
	)
}
