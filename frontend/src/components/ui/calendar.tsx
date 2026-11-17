import { cn } from 'cn'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { type ComponentProps, useEffect, useRef } from 'react'
import { type Chevron, type DayButton, DayPicker } from 'react-day-picker'
import { ptBR } from 'react-day-picker/locale'
import { buttonVariants } from './button'

function Calendar({
	className,
	classNames,
	showOutsideDays = true,
	...props
}: ComponentProps<typeof DayPicker>) {
	return (
		<DayPicker
			locale={ptBR}
			showOutsideDays={showOutsideDays}
			className={cn('[--cell-size:--spacing(9)]', className)}
			classNames={{
				months: 'relative flex flex-col',
				month: 'flex flex-col gap-4',
				nav: 'absolute inset-x-0 top-0 flex items-center justify-between',
				button_previous: buttonVariants({ variant: 'outline', size: 'pagination' }),
				button_next: buttonVariants({ variant: 'outline', size: 'pagination' }),
				month_caption: 'flex h-8 items-center justify-center',
				caption_label: 'text-sm font-semibold text-gray-800 capitalize',
				weekdays: 'flex',
				weekday: 'w-(--cell-size) text-xs font-medium text-gray-500 uppercase',
				week: 'mt-1 flex',
				day: 'p-0',
				hidden: 'invisible',
				...classNames,
			}}
			components={{
				Chevron: CalendarChevron,
				DayButton: CalendarDayButton,
			}}
			{...props}
		/>
	)
}

function CalendarChevron({ orientation, className }: ComponentProps<typeof Chevron>) {
	if (orientation === 'left') {
		return <ChevronLeft className={className} />
	}

	return <ChevronRight className={className} />
}

function CalendarDayButton({
	className,
	day,
	modifiers,
	...props
}: ComponentProps<typeof DayButton>) {
	const ref = useRef<HTMLButtonElement>(null)

	useEffect(() => {
		if (modifiers.focused) {
			ref.current?.focus()
		}
	}, [modifiers.focused])

	return (
		<button
			ref={ref}
			type="button"
			data-day={day.date.toLocaleDateString('pt-BR')}
			className={cn(
				'size-(--cell-size) cursor-pointer rounded-lg text-sm text-gray-700 tabular-nums outline-none transition-colors hover:bg-gray-200 focus-visible:ring-3 focus-visible:ring-brand-base/25',
				modifiers.outside && 'text-gray-400',
				modifiers.today && 'font-semibold text-brand-base',
				modifiers.selected && 'bg-brand-base font-normal text-white hover:bg-brand-dark',
				className
			)}
			{...props}
		/>
	)
}

export { Calendar }
