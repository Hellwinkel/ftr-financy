import type { ReactNode } from 'react'

export function SectionTitle({ children }: { children: ReactNode }) {
	return (
		<h2 className="text-xs text-gray-500 uppercase leading-4 tracking-wider font-medium truncate">
			{children}
		</h2>
	)
}
