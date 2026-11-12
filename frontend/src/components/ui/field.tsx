import { cn } from 'cn'
import { Label } from '@/components/ui/label'

function Field({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="field"
			className={cn(
				'group/field flex w-full gap-2 flex-col has-[>[data-slot=checkbox]]:flex-row has-[>[data-slot=checkbox]]:items-center has-[>[data-slot=checkbox]]:w-fit',
				className
			)}
			{...props}
		/>
	)
}

function FieldLabel({ className, ...props }: React.ComponentProps<typeof Label>) {
	return (
		<Label
			data-slot="field-label"
			className={cn(
				'w-fit group-[:focus-within:not(:has([data-slot=checkbox]))]/field:text-brand-base group-has-aria-invalid/field:text-danger! group-has-[[data-slot=checkbox]]/field:font-normal group-has-[[data-slot=checkbox]:not([data-disabled])]/field:cursor-pointer group-has-[[data-slot=checkbox][data-disabled]]/field:opacity-50',
				className
			)}
			{...props}
		/>
	)
}

function FieldDescription({ className, ...props }: React.ComponentProps<'p'>) {
	return (
		<p
			data-slot="field-description"
			className={cn('text-xs/5 font-normal text-gray-500', className)}
			{...props}
		/>
	)
}

export { Field, FieldDescription, FieldLabel }
