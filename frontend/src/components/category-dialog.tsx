import { useMutation } from '@apollo/client/react'
import { cn } from 'cn'
import { icons, Plus, SquarePen } from 'lucide-react'
import { type SubmitEvent, useState } from 'react'
import { toast } from 'sonner'
import { type CategoryColor, categoryColors } from '@/lib/category-colors'
import { CREATE_CATEGORY, UPDATE_CATEGORY } from '@/lib/graphql/mutations/category'
import { LIST_CATEGORIES } from '@/lib/graphql/queries/category'
import type { Category, CreateCategoryInput, UpdateCategoryInput } from '@/types/category'
import { Button } from './ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from './ui/dialog'
import { Field, FieldDescription, FieldLabel } from './ui/field'
import { Input } from './ui/input'

const categoryIcons: (keyof typeof icons)[] = [
	'BriefcaseBusiness',
	'CarFront',
	'HeartPulse',
	'PiggyBank',
	'ShoppingCart',
	'Ticket',
	'ToolCase',
	'Utensils',
	'PawPrint',
	'House',
	'Gift',
	'Dumbbell',
	'BookOpen',
	'BaggageClaim',
	'Mailbox',
	'ReceiptText',
]

const colorOptions: { value: CategoryColor; label: string }[] = [
	{ value: 'green', label: 'Verde' },
	{ value: 'blue', label: 'Azul' },
	{ value: 'purple', label: 'Roxo' },
	{ value: 'pink', label: 'Rosa' },
	{ value: 'red', label: 'Vermelho' },
	{ value: 'orange', label: 'Laranja' },
	{ value: 'yellow', label: 'Amarelo' },
]

type CategoryDialogProps = {
	category?: Category
}

type CreateCategoryMutationData = {
	createCategory: Category
}

type UpdateCategoryMutationData = {
	updateCategory: Category
}

export function CategoryDialog({ category }: CategoryDialogProps) {
	const isEditing = !!category

	const [open, setOpen] = useState(false)
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [icon, setIcon] = useState('')
	const [color, setColor] = useState<CategoryColor | ''>('')

	const [createCategory, { loading: creating }] = useMutation<
		CreateCategoryMutationData,
		{ data: CreateCategoryInput }
	>(CREATE_CATEGORY)

	const [updateCategory, { loading: updating }] = useMutation<
		UpdateCategoryMutationData,
		{ id: string; data: UpdateCategoryInput }
	>(UPDATE_CATEGORY)

	const loading = creating || updating

	function handleOpenChange(nextOpen: boolean) {
		if (nextOpen) {
			setTitle(category?.title ?? '')
			setDescription(category?.description ?? '')
			setIcon(category?.icon ?? '')
			setColor(category?.color ?? '')
		}

		setOpen(nextOpen)
	}

	async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
		event.preventDefault()

		if (!icon) {
			toast.error('É preciso escolher um ícone para a categoria')
			return
		}

		if (!color) {
			toast.error('É preciso escolher uma cor para a categoria')
			return
		}

		const data = {
			title: title.trim(),
			description: description.trim() || null,
			icon,
			color,
		}

		const toastId = toast.loading('Salvando categoria...')

		try {
			if (category) {
				await updateCategory({
					variables: {
						id: category.id,
						data,
					},
					refetchQueries: [LIST_CATEGORIES],
				})
			} else {
				await createCategory({
					variables: {
						data,
					},
					refetchQueries: [LIST_CATEGORIES],
				})
			}

			toast.success(
				isEditing ? 'Categoria atualizada com sucesso' : 'Categoria criada com sucesso',
				{ id: toastId }
			)
			setOpen(false)
		} catch (error) {
			toast.error(error instanceof Error ? error.message : 'Erro ao salvar categoria', {
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
							title="Editar categoria"
							aria-label="Editar categoria"
						/>
					}
				>
					<SquarePen />
				</DialogTrigger>
			) : (
				<DialogTrigger render={<Button size="sm" />}>
					<Plus />
					Nova categoria
				</DialogTrigger>
			)}

			<DialogContent>
				<DialogHeader>
					<DialogTitle>{isEditing ? 'Editar categoria' : 'Nova categoria'}</DialogTitle>
					<DialogDescription>
						{isEditing ? 'Altere os dados da categoria' : 'Organize suas transações com categorias'}
					</DialogDescription>
				</DialogHeader>

				<form className="flex flex-col gap-6" onSubmit={handleSubmit}>
					<div className="flex flex-col gap-4">
						<Field>
							<FieldLabel htmlFor="title">Título</FieldLabel>
							<Input
								type="text"
								name="title"
								id="title"
								placeholder="Ex. Alimentação"
								required
								value={title}
								onChange={(event) => setTitle(event.target.value)}
								disabled={loading}
							/>
						</Field>

						<Field>
							<FieldLabel htmlFor="description">Descrição</FieldLabel>
							<Input
								type="text"
								name="description"
								id="description"
								placeholder="Descrição da categoria"
								value={description}
								onChange={(event) => setDescription(event.target.value)}
								disabled={loading}
							/>
							<FieldDescription>Opcional</FieldDescription>
						</Field>

						<fieldset className="flex flex-col gap-2" disabled={loading}>
							<legend className="mb-2 text-sm font-medium text-gray-700">Ícone</legend>
							<div className="grid grid-cols-8 gap-2">
								{categoryIcons.map((name) => {
									const Icon = icons[name]

									return (
										<label
											key={name}
											className="grid size-10.5 cursor-pointer place-items-center text-gray-600 rounded-lg inset-shadow-[0_0_0_1px] inset-shadow-gray-300 transition-colors hover:bg-gray-200 hover:inset-shadow-gray-200 has-checked:inset-shadow-brand-base has-checked:bg-gray-100 has-checked:text-gray-800 has-focus-visible:ring-3 has-focus-visible:ring-brand-base/25"
										>
											<input
												type="radio"
												name="icon"
												value={name}
												aria-label={name}
												className="sr-only"
												checked={icon === name}
												onChange={() => setIcon(name)}
											/>
											<Icon className="size-5" />
										</label>
									)
								})}
							</div>
						</fieldset>

						<fieldset className="flex flex-col gap-2" disabled={loading}>
							<legend className="mb-2 text-sm font-medium text-gray-700">Cor</legend>
							<div className="grid grid-cols-7 gap-2">
								{colorOptions.map((option) => {
									return (
										<label
											key={option.value}
											className="flex cursor-pointer rounded-lg p-1.25 inset-shadow-[0_0_0_1px] inset-shadow-gray-300 transition-colors hover:bg-gray-200 hover:inset-shadow-gray-200 has-checked:inset-shadow-brand-base has-checked:bg-gray-100 has-focus-visible:ring-3 has-focus-visible:ring-brand-base/25"
										>
											<input
												type="radio"
												name="color"
												value={option.value}
												aria-label={option.label}
												className="sr-only"
												checked={color === option.value}
												onChange={() => setColor(option.value)}
											/>
											<span
												className={cn(
													'block w-full h-5 rounded-sm',
													categoryColors[option.value].swatch
												)}
											/>
										</label>
									)
								})}
							</div>
						</fieldset>
					</div>

					<Button type="submit" className="w-full">
						Salvar
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	)
}
