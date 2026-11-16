import { cn } from 'cn'
import { icons, Plus, SquarePen } from 'lucide-react'
import { type CategoryColor, categoryColors } from '@/lib/category-colors'
import type { Category } from '@/types/category'
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

export function CategoryDialog({ category }: CategoryDialogProps) {
	const isEditing = !!category

	return (
		<Dialog>
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

				<form className="flex flex-col gap-6">
					<div className="flex flex-col gap-4">
						<Field>
							<FieldLabel htmlFor="title">Título</FieldLabel>
							<Input
								type="text"
								name="title"
								id="title"
								placeholder="Ex. Alimentação"
								defaultValue={category?.title}
								required
							/>
						</Field>

						<Field>
							<FieldLabel htmlFor="description">Descrição</FieldLabel>
							<Input
								type="text"
								name="description"
								id="description"
								placeholder="Descrição da categoria"
								defaultValue={category?.description ?? undefined}
							/>
							<FieldDescription>Opcional</FieldDescription>
						</Field>

						<fieldset className="flex flex-col gap-2">
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
												defaultChecked={name === category?.icon}
											/>
											<Icon className="size-5" />
										</label>
									)
								})}
							</div>
						</fieldset>

						<fieldset className="flex flex-col gap-2">
							<legend className="mb-2 text-sm font-medium text-gray-700">Cor</legend>
							<div className="grid grid-cols-7 gap-2">
								{colorOptions.map((color) => {
									return (
										<label
											key={color.value}
											className="flex cursor-pointer rounded-lg p-1.25 inset-shadow-[0_0_0_1px] inset-shadow-gray-300 transition-colors hover:bg-gray-200 hover:inset-shadow-gray-200 has-checked:inset-shadow-brand-base has-checked:bg-gray-100 has-focus-visible:ring-3 has-focus-visible:ring-brand-base/25"
										>
											<input
												type="radio"
												name="color"
												value={color.value}
												aria-label={color.label}
												className="sr-only"
												defaultChecked={color.value === category?.color}
											/>
											<span
												className={cn(
													'block w-full h-5 rounded-sm',
													categoryColors[color.value].swatch
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
