import { Input as InputPrimitive } from '@base-ui/react/input'
import { cn } from 'cn'
import { Eye, EyeClosed, type LucideIcon } from 'lucide-react'
import * as React from 'react'

type InputProps = React.ComponentProps<'input'> & {
	icon?: LucideIcon
}

function Input({ className, type, icon: Icon, ...props }: InputProps) {
	const [showPassword, setShowPassword] = React.useState(false)
	const isPassword = type === 'password'

	function togglePassword() {
		setShowPassword((prev) => !prev)
	}

	return (
		<div className="relative w-full">
			<InputPrimitive
				type={isPassword && showPassword ? 'text' : type}
				data-slot="input"
				className={cn(
					'peer h-12 w-full min-w-0 rounded-lg border border-gray-300 bg-white px-3.5 text-base text-gray-800 caret-brand-base outline-none placeholder:text-gray-400 disabled:pointer-events-none disabled:cursor-auto disabled:opacity-50',
					Icon && 'pl-10.5',
					isPassword && 'pr-10.5',
					className
				)}
				{...props}
			/>

			{Icon && (
				<Icon className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-gray-700 peer-placeholder-shown:text-gray-400 peer-focus:text-brand-base peer-aria-invalid:text-danger! peer-disabled:opacity-50" />
			)}

			{isPassword && (
				<button
					type="button"
					onClick={togglePassword}
					title={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
					className="absolute right-3.5 top-1/2 -translate-y-1/2 cursor-pointer text-gray-700 [&>svg]:size-4"
				>
					{showPassword ? <EyeClosed /> : <Eye />}
				</button>
			)}
		</div>
	)
}

export { Input }
