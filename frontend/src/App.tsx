import { Trash, UserRoundPlus } from "lucide-react"
import { Button } from "./components/ui/button"
import { Badge } from "./components/ui/badge"
import { TransactionType } from "./components/transaction-type"
import { useEffect, useState } from "react"

function App() {
  const [numero, setNumero] = useState(0)

  useEffect(() => {
    console.log(`O número mudou e agora é ${numero}`)
  }, [numero])

  return (
    <main className="flex min-h-screen items-center justify-center flex-col gap-4">
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
        <TransactionType type="outcome" />
      </div>
    </main>
  )
}

export default App
