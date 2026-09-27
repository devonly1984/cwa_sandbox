"use client"

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
import { suggestions } from "@/lib/constants/suggestions"
import { createGame } from "@/lib/games/actions"

const ChatComposer = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      <form action={createGame}>
        <InputGroup className="bg-popover">
          <InputGroupTextarea
            aria-label="Describe the game you want to build"
            className="field-sizing-content max-h-48 min-h-10"
            name="title"
            placeholder="Describe the game you want to build..."
            rows={1}
            required
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
              aria-label="Create game"
              className="ml-auto rounded-full"
              size="icon-lg"
              type="submit"
            >
              <ArrowUp aria-hidden="true" />
            </Button>
          </InputGroupAddon>
        </InputGroup>
      </form>

      <div className="flex flex-wrap justify-center gap-2">
        {suggestions.map((suggestion) => (
          <Button
            key={suggestion.label}
            variant={"outline"}
            size="sm"
            className={"rounded-full font-normal text-muted-foreground"}
          >
            <suggestion.icon />
            {suggestion.label}
          </Button>
        ))}
      </div>
    </div>
  )
}

export { ChatComposer }