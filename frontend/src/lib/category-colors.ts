export const categoryColors = {
	gray: {
		badge: 'bg-gray-200 text-gray-700',
		icon: 'bg-gray-200 text-gray-500',
		swatch: 'bg-gray-500',
	},
	blue: {
		badge: 'bg-blue-light text-blue-dark',
		icon: 'bg-blue-light text-blue-base',
		swatch: 'bg-blue-base',
	},
	purple: {
		badge: 'bg-purple-light text-purple-dark',
		icon: 'bg-purple-light text-purple-base',
		swatch: 'bg-purple-base',
	},
	pink: {
		badge: 'bg-pink-light text-pink-dark',
		icon: 'bg-pink-light text-pink-base',
		swatch: 'bg-pink-base',
	},
	red: {
		badge: 'bg-red-light text-red-dark',
		icon: 'bg-red-light text-red-base',
		swatch: 'bg-red-base',
	},
	orange: {
		badge: 'bg-orange-light text-orange-dark',
		icon: 'bg-orange-light text-orange-base',
		swatch: 'bg-orange-base',
	},
	yellow: {
		badge: 'bg-yellow-light text-yellow-dark',
		icon: 'bg-yellow-light text-yellow-base',
		swatch: 'bg-yellow-base',
	},
	green: {
		badge: 'bg-green-light text-green-dark',
		icon: 'bg-green-light text-green-base',
		swatch: 'bg-green-base',
	},
} as const

export type CategoryColor = keyof typeof categoryColors
