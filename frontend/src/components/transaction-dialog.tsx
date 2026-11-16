import { useMutation } from '@apollo/client/react'
import { cn } from 'cn'
import { Plus, SquarePen } from 'lucide-react'
import { type SubmitEvent, useState } from 'react'
import { toast } from 'sonner'
import { parseCurrency } from '@/lib/format'
import { CREATE_TRANSACTION, UPDATE_TRANSACTION } from '@/lib/graphql/mutations/transaction'
import { LIST_CATEGORIES } from '@/lib/graphql/queries/category'
import { LIST_TRANSACTIONS } from '@/lib/graphql/queries/transaction'
import { transactionTypes } from '@/lib/transaction-types'
import type { Category } from '@/types/category'
import type {
	CreateTransactionInput,
	Transaction,
	UpdateTransactionInput,
} from '@/types/transaction'
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

type CreateTransactionMutationData = {
	createTransaction: Pick<Transaction, 'id'>
}

type UpdateTransactionMutationData = {
	updateTransaction: Pick<Transaction, 'id'>
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

	const [open, setOpen] = useState(false)
	const [type, setType] = useState<Transaction['type']>('expense')
	const [description, setDescription] = useState('')
	const [transactionDate, setTransactionDate] = useState('')
	const [value, setValue] = useState('')
	const [categoryId, setCategoryId] = useState<string | null>(null)

	const [createTransaction, { loading: creating }] = useMutation<
		CreateTransactionMutationData,
		{ data: CreateTransactionInput }
	>(CREATE_TRANSACTION)

	const [updateTransaction, { loading: updating }] = useMutation<
		UpdateTransactionMutationData,
		{ id: string; data: UpdateTransactionInput }
	>(UPDATE_TRANSACTION)

	const loading = creating || updating

	const categoryOptions = categories.map((category) => ({
		label: category.title,
		value: category.id,
	}))

	function handleOpenChange(nextOpen: boolean) {
		if (nextOpen) {
			setType(transaction?.type ?? 'expense')
			setDescription(transaction?.description ?? '')
			setTransactionDate(transaction?.transactionDate ?? '')
			setValue(transaction ? (transaction.value / 100).toFixed(2).replace('.', ',') : '')
			setCategoryId(transaction?.categoryId ?? null)
		}

		setOpen(nextOpen)
	}

	async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
		event.preventDefault()

		const parsedValue = parseCurrency(value)

		if (Number.isNaN(parsedValue) || parsedValue <= 0) {
			toast.error('Informe um valor válido')
			return
		}

		if (!categoryId) {
			toast.error('É preciso selecionar uma categoria')
			return
		}

		const data = {
			type,
			description: description.trim(),
			transactionDate,
			value: parsedValue,
			categoryId,
		}

		const toastId = toast.loading('Salvando transação...')

		try {
			if (transaction) {
				await updateTransaction({
					variables: {
						id: transaction.id,
						data,
					},
					refetchQueries: [LIST_TRANSACTIONS, LIST_CATEGORIES],
				})
			} else {
				await createTransaction({
					variables: {
						data,
					},
					refetchQueries: [LIST_TRANSACTIONS, LIST_CATEGORIES],
				})
			}

			toast.success(
				isEditing ? 'Transação atualizada com sucesso' : 'Transação criada com sucesso',
				{ id: toastId }
			)

			setOpen(false)
		} catch (error) {
			toast.error(error instanceof Error ? error.message : 'Erro ao salvar transação', {
				id: toastId,
			})
		}
	}

	return (
		<Dialog open={open} onOpenChange={handleOpenChange}>
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

				<form className="flex flex-col gap-6" onSubmit={handleSubmit}>
					<fieldset
						className="flex rounded-xl p-2 inset-shadow-[0_0_0_1px] inset-shadow-gray-200"
						disabled={loading}
					>
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
										className="sr-only"
										checked={type === option.value}
										onChange={() => setType(option.value)}
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
								required
								value={description}
								onChange={(event) => setDescription(event.target.value)}
								disabled={loading}
							/>
						</Field>

						<div className="grid grid-cols-2 gap-4">
							<Field>
								<FieldLabel htmlFor="transactionDate">Data</FieldLabel>
								<Input
									type="date"
									id="transactionDate"
									name="transactionDate"
									required
									value={transactionDate}
									onChange={(event) => setTransactionDate(event.target.value)}
									disabled={loading}
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
									required
									value={value}
									onChange={(event) => setValue(event.target.value)}
									disabled={loading}
								/>
							</Field>
						</div>

						<Field>
							<FieldLabel htmlFor="categoryId">Categoria</FieldLabel>
							<Select
								items={categoryOptions}
								name="categoryId"
								value={categoryId}
								onValueChange={(newCategory) => setCategoryId(newCategory)}
								disabled={loading}
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

					<Button type="submit" className="w-full" disabled={loading}>
						Salvar
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	)
}
