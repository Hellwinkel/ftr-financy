import { ArrowUpDown, Lock, Mail, Trash, UserRoundPlus } from "lucide-react"
import { Button } from "./components/ui/button"
import { Badge } from "./components/ui/badge"
import { TransactionType } from "./components/transaction-type"
import { useEffect, useState } from "react"
import { Field, FieldDescription, FieldLabel } from "./components/ui/field"
import { Input } from "./components/ui/input"
import { Checkbox } from "./components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select"

function App() {
  const [numero, setNumero] = useState(0)
  const tipos = { income: "Receita", expense: "Despesa" }

  useEffect(() => {
    console.log(`O número mudou e agora é ${numero}`)
  }, [numero])

  return (
    <main className="flex min-h-screen py-24 items-center justify-center flex-col gap-4">
      <p>Número {numero}</p>
      <div className="flex items-center gap-3">
        <Button onClick={() => setNumero(numero + 1)}>
          <UserRoundPlus />
          Label
        </Button>
        <Button variant={"outline"}>
          <UserRoundPlus />
          Label
        </Button>
      </div>

      <div className="flex items-center gap-3">
        <Button disabled>
          <UserRoundPlus />
          Label
        </Button>
        <Button variant={"outline"} disabled>
          <UserRoundPlus />
          Label
        </Button>
      </div>

      <div className="flex items-center gap-3">
        <Button size={"sm"}>
          <UserRoundPlus />
          Label
        </Button>
        <Button variant={"outline"} size={"sm"}>
          <UserRoundPlus />
          Label
        </Button>
      </div>

      <div className="flex items-center gap-3">
        <Button size={"sm"} disabled>
          <UserRoundPlus />
          Label
        </Button>
        <Button variant={"outline"} size={"sm"} disabled>
          <UserRoundPlus />
          Label
        </Button>
      </div>

      <div className="flex items-center gap-3">
        <Button variant={"destructive"} size={"icon"}>
          <Trash />
        </Button>
        <Button variant={"outline"} size={"pagination"}>
          1
        </Button>
        <Button variant={"default"} size={"pagination"}>
          1
        </Button>
      </div>

      <div className="flex items-center gap-3">
        <Badge variant={"gray"}>
          Label
        </Badge>
        <Badge variant={"blue"}>
          Label
        </Badge>
        <Badge variant={"purple"}>
          Label
        </Badge>
        <Badge variant={"pink"}>
          Label
        </Badge>
        <Badge variant={"red"}>
          Label
        </Badge>
        <Badge variant={"orange"}>
          Label
        </Badge>
        <Badge variant={"yellow"}>
          Label
        </Badge>
        <Badge variant={"green"}>
          Label
        </Badge>
      </div>

      <div className="flex items-center gap-3">
        <TransactionType type="income" />
        <TransactionType type="expense" />
      </div>

      <div className="flex flex-col items-center gap-4 w-95.5">
        <Field>
          <FieldLabel htmlFor="email">E-mail</FieldLabel>
          <Input id="email" icon={Mail} placeholder="mail@exemplo.com" />
          <FieldDescription>Helper text</FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="senha">Senha</FieldLabel>
          <Input id="senha" type="password" icon={Lock} placeholder="Digite sua senha" />
        </Field>
        <Field>
          <FieldLabel htmlFor="erro">Com erro</FieldLabel>
          <Input id="erro" icon={Mail} aria-invalid placeholder="mail@exemplo.com" />
          <FieldDescription>Mensagem de erro</FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="off">Desabilitado</FieldLabel>
          <Input id="off" icon={Mail} disabled placeholder="mail@exemplo.com" />
        </Field>

        <Field>
          <FieldLabel htmlFor="tipo">Tipo</FieldLabel>
          <Select items={tipos}>
            <SelectTrigger id="tipo" icon={ArrowUpDown}>
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(tipos).map(([value, label]) => (
                <SelectItem key={value} value={value}>{label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
      </div>

      <div className="flex flex-col items-center gap-4">
        <Field>
          <Checkbox id="teste" />
          <FieldLabel htmlFor="teste">Lembrar-me</FieldLabel>
        </Field>
      </div>
    </main>
  )
}

export default App
