import { type FormEvent } from "react"
import { ArrowUp, ChevronDown, Grip } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "@/components/ui/input-group"

type ChatComposerProps = {
  value: string
  onValueChange: (value: string) => void
  onSubmit: (value: string) => void | Promise<void>
  disabled?: boolean
  submitLabel?: string
}

const ChatComposer = ({
  value,
  onValueChange,
  onSubmit,
  disabled = false,
  submitLabel = "Create game",
}: ChatComposerProps) => {
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await onSubmit(value)
  }

  return (
    <div className="flex w-full flex-col gap-6">
      <form onSubmit={handleSubmit} className="w-full">
        <InputGroup className="bg-popover">
          <InputGroupTextarea
            aria-label="Describe the game you want to build"
            className="field-sizing-content max-h-48 min-h-10"
            name="title"
            placeholder="Describe the game you want to build..."
            rows={1}
            required
            disabled={disabled}
            value={value}
            onChange={(event) => onValueChange(event.target.value)}
          />
          <InputGroupAddon align="block-end">
            <DropdownMenu>
              <DropdownMenuTrigger
                aria-label="Select a model"
                render={
                  <InputGroupButton>
                    <Grip aria-hidden="true" />
                    Kimi K3
                    <ChevronDown aria-hidden="true" />
                  </InputGroupButton>
                }
              />

              <DropdownMenuContent className="w-auto">
                <DropdownMenuItem>Kimi K3</DropdownMenuItem>
                <DropdownMenuItem>Claude Sonnet</DropdownMenuItem>
                <DropdownMenuItem>GPT-4.1</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              aria-label={submitLabel}
              className="ml-auto rounded-full"
              size="icon-lg"
              type="submit"
              disabled={disabled}
            >
              <ArrowUp aria-hidden="true" />
            </Button>
          </InputGroupAddon>
        </InputGroup>
      </form>
    </div>
  )
}

export { ChatComposer }
