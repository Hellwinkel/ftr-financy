import logo from '@/assets/logo.svg'
import { Avatar, AvatarFallback } from './ui/avatar'

export function Navbar() {
	return (
		<header className="bg-white border-b border-gray-200 ">
			<div className="w-11/12 max-w-7xl mx-auto py-4 grid grid-cols-[1fr_auto_1fr] gap-4 items-center">
				<img src={logo} alt="Financy" width={134} height={32} className="h-8" />

				<nav className="justify-self-center">
					<ul className="flex items-center gap-5">
						<li>
							<a
								href="dashboard"
								className="text-brand-base text-sm font-semibold transition-colors hover:text-brand-dark"
							>
								Dashboard
							</a>
						</li>
						<li>
							<a
								href="transacoes"
								className="text-gray-600 text-sm transition-colors hover:text-brand-dark"
							>
								Transações
							</a>
						</li>
						<li>
							<a
								href="categorias"
								className="text-gray-600 text-sm transition-colors hover:text-brand-dark"
							>
								Categorias
							</a>
						</li>
					</ul>
				</nav>

				<Avatar className="justify-self-end">
					<AvatarFallback>CT</AvatarFallback>
				</Avatar>
			</div>
		</header>
	)
}
