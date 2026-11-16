export function formatCurrency(value: number) {
	if (!Number.isFinite(value)) {
		console.error('O valor informado não é válido')
		return '—'
	}

	return Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value / 100)
}

export function formatDate(date: Date | string) {
	if (typeof date === 'string') {
		date = new Date(date)
	}

	if (Number.isNaN(date.getTime())) {
		console.error('A data informada não é válida')
		return '—'
	}

	return Intl.DateTimeFormat('pt-BR', {
		day: '2-digit',
		month: '2-digit',
		year: '2-digit',
		timeZone: 'UTC',
	}).format(date)
}

export function getInitials(name: string) {
	const words = name.trim().split(/\s+/)
	const first = words[0]?.[0] ?? ''
	const last = words.length > 1 ? (words[words.length - 1]?.[0] ?? '') : (words[0]?.[1] ?? '')

	return (first + last).toUpperCase()
}

export function parseCurrency(value: string) {
	const normalized = value.includes(',') ? value.replace(/\./g, '').replace(',', '.') : value

	return Math.round(Number(normalized) * 100)
}
