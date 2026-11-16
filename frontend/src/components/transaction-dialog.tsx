import { cn } from 'cn'
import { Plus, SquarePen } from 'lucide-react'
import { transactionTypes } from '@/lib/transaction-types'
import type { Category } from '@/types/category'
import type { Transaction } from '@/types/transaction'
import { Button } from './ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from './ui/dialog'
import { Field, FieldLabel } from './ui/field'
import { Input } from './ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'

type TransactionDialogProps = {
	transaction?: Transaction
	categories: Pick<Category, 'id' | 'title'>[]
	variant?: 'button' | 'link'
	className?: string
}

const typeOptions = [
	{ value: 'expense', label: 'Despesa' },
	{ value: 'income', label: 'Receita' },
] as const

export function TransactionDialog({
	transaction,
	categories,
	variant = 'button',
	className,
}: TransactionDialogProps) {
	const isEditing = !!transaction

	const categoryOptions = categories.map((category) => ({
		label: category.title,
		value: category.id,
	}))

	const defaultValue = isEditing
		? (transaction.value / 100).toFixed(2).replace('.', ',')
		: undefined

	return (
		<Dialog>
			{isEditing ? (
				<DialogTrigger
					render={
						<Button
							type="button"
							variant="outline"
							size="icon"
							title="Editar transação"
							aria-label="Editar transação"
						/>
					}
				>
					<SquarePen />
				</DialogTrigger>
			) : (
				<DialogTrigger
					render={
						variant === 'link' ? (
							<button type="button" className={cn('text-link', className)} />
						) : (
							<Button size="sm" className={className} />
						)
					}
				>
					<Plus />
					Nova transação
				</DialogTrigger>
			)}

			<DialogContent>
				<DialogHeader>
					<DialogTitle>{isEditing ? 'Editar transação' : 'Nova transação'}</DialogTitle>
					<DialogDescription>
						{isEditing ? 'Altere os dados da transação' : 'Registre sua despesa ou receita'}
					</DialogDescription>
				</DialogHeader>

				<form className="flex flex-col gap-6">
					<fieldset className="flex rounded-xl p-2 inset-shadow-[0_0_0_1px] inset-shadow-gray-200">
						<legend className="sr-only">Tipo</legend>

						{typeOptions.map((option) => {
							const { icon: Icon, checked } = transactionTypes[option.value]

							return (
								<label
									key={option.value}
									className={cn(
										'flex flex-1 cursor-pointer items-center justify-center gap-3 rounded-lg px-3 py-3.5 leading-4.5 text-gray-600 transition-colors has-checked:bg-gray-100 has-checked:font-medium has-checked:text-gray-800 has-checked:inset-shadow-[0_0_0_1px] has-focus-visible:ring-3 has-focus-visible:ring-brand-base/25 [&_svg]:size-4',
										checked
									)}
								>
									<input
										type="radio"
										name="type"
										value={option.value}
										defaultChecked={option.value === (transaction?.type ?? 'expense')}
										className="sr-only"
									/>
									<Icon />
									{option.label}
								</label>
							)
						})}
					</fieldset>

					<div className="flex flex-col gap-4">
						<Field>
							<FieldLabel htmlFor="description">Descrição</FieldLabel>
							<Input
								id="description"
								name="description"
								placeholder="Ex. Almoço no restaurante"
								defaultValue={transaction?.description}
								required
							/>
						</Field>

						<div className="grid grid-cols-2 gap-4">
							<Field>
								<FieldLabel htmlFor="transactionDate">Data</FieldLabel>
								<Input
									type="date"
									id="transactionDate"
									name="transactionDate"
									defaultValue={transaction?.transactionDate}
									required
								/>
							</Field>

							<Field>
								<FieldLabel htmlFor="value">Valor</FieldLabel>
								<Input
									id="value"
									name="value"
									inputMode="decimal"
									prefix="R$"
									placeholder="0,00"
									defaultValue={defaultValue}
									required
								/>
							</Field>
						</div>

						<Field>
							<FieldLabel htmlFor="categoryId">Categoria</FieldLabel>
							<Select
								items={categoryOptions}
								defaultValue={transaction?.categoryId}
								name="categoryId"
							>
								<SelectTrigger id="categoryId">
									<SelectValue placeholder="Selecione" />
								</SelectTrigger>

								<SelectContent>
									{categoryOptions.map((option) => (
										<SelectItem key={option.value} value={option.value}>
											{option.label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</Field>
					</div>

					<Button type="submit" className="w-full">
						Salvar
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	)
}
