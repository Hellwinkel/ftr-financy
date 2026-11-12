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
