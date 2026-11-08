import { cva } from "class-variance-authority";
import { cn } from "cn";
import { CircleArrowDown, CircleArrowUp } from "lucide-react";

const transactionTypeVariants = cva(
  "inline-flex items-center gap-2 text-sm font-medium [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      type: {
        income: "text-green-dark [&_svg]:text-green-base",
        outcome: "text-red-dark [&_svg]:text-red-base"
      }
    }
  }
)

const config = {
  income: { label: "Entrada", Icon: CircleArrowUp },
  outcome: { label: "Saída", Icon: CircleArrowDown }
}

function TransactionType({ type, className }: {type: "income" | "outcome"; className?: string}) {
  const {label, Icon} = config[type]

  return (
    <span className={cn(transactionTypeVariants({ type }), className)}>
      <Icon />
      {label}
    </span>
  )
}

export {TransactionType, transactionTypeVariants}